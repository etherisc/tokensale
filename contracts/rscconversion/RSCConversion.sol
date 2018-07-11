/**
 * @title RSC Conversion Contract
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity 0.4.24;

import "../token/DipToken.sol";
import "../tokensale/DipTge.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20.sol";


contract RSCConversion is Ownable {

  using SafeMath for *;

  DipToken DIP;
  DipTge DIP_TGE;
  ERC20 RSC;

  // TotalSupply taken from
  // https://etherscan.io/token/0x9b0f6a5a667cb92af0cd15dbe90e764e32f69e77#readContract
  uint256 constant TotalRSCSupply = 319810709968;
  bool conversionAllowed = false;

  mapping(address => uint256) lockedTokens;

  event Conversion(uint256 _rscAmount, uint256 _dipAmount, uint256 _bonus);

  constructor (address _dipToken, address _dipTge, address _rscToken) public {
    DIP = DipToken(_dipToken);
    DIP_TGE = DipTge(_dipTge);
    RSC = ERC20(_rscToken);
  }

  function setStatus(bool _conversionAllowed) public onlyOwner {
    conversionAllowed = _conversionAllowed;
  }

  function convert(uint256 _rscAmount) public returns(uint256 _dipAmount) {

    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    bool airdrop;
    uint256 bonus;
    uint256 lockupPeriod;

    require(conversionAllowed);

    (allowance, contributionAmount, tokensIssued, airdrop, bonus, lockupPeriod) =
      DIP_TGE.contributorList(msg.sender);

    require(allowance > 0);
    require(RSC.transferFrom(msg.sender, this, _rscAmount));
    _dipAmount = _rscAmount.mul(10).div(32);

    if (bonus > 0) {
      assert(lockupPeriod == 1);
      _dipAmount = _dipAmount.add(_dipAmount.mul(100).div(bonus));
    }
    require(DIP.transfer(msg.sender, _dipAmount));
    emit Conversion(_rscAmount, _dipAmount, bonus);
  }

  function reclaimUnusedBonus() public onlyOwner {
    require(block.timestamp >= DIP_TGE.lockInTime1());
    //
    // Method to calculate unused Bonus:
    // After lockinTime1, we only need DIP for the remaining
    // unconverted RSC.
    // unconverted_RSC = TotalRSCSupply - RSC.balance(this)
    // To convert those unconverted RSC, we need
    // unconverted_RSC * 10/32 DIP tokens.
    // The rest, DIP.balance(this) - unconverted_RSC * 10/32,
    // can be reclaimed by Foundation.
    //
    uint256 unconverted_RSC = TotalRSCSupply.sub(RSC.balanceOf(this));
    uint256 unusedBonus =
      DIP.balanceOf(this)
      .sub(unconverted_RSC
        .mul(10)
          .div(32)
      );
    DIP.transfer(owner, unusedBonus);
  }

}

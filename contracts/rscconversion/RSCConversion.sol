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
  uint256 constant TotalRSCSupply = 319999999; // TODO: insert exact number

  mapping(address => uint256) lockedTokens;

  event Conversion(uint256 _rscAmount, uint256 _dipAmount, uint256 _bonus);

  constructor (address _dipToken, address _dipTge, address _rscToken) public {
    DIP = DipToken(_dipToken);
    DIP_TGE = DipTge(_dipTge);
    RSC = ERC20(_rscToken);
  }

  function convert(uint256 _rscAmount) public returns(uint256 _dipAmount) {

    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    bool airdrop;
    uint256 bonus;
    uint256 lockupPeriod;

    (allowance, contributionAmount, tokensIssued, airdrop, bonus, lockupPeriod) =
      DIP_TGE.contributorList(msg.sender);

    require(allowance > 0);
    require(RSC.transferFrom(msg.sender, this, _rscAmount));
    _dipAmount = _rscAmount.mul(10).div(32);

    if (bonus > 0) {
      _dipAmount = _dipAmount.mul(100).div(bonus);
    }
    require(DIP.transfer(msg.sender, _dipAmount));
    emit Conversion(_rscAmount, _dipAmount, bonus);
  }

  function reclaimUnusedBonus() public onlyOwner {
    require(block.timestamp >= DIP_TGE.lockInTime1());
    uint256 unusedBonus =
    DIP.balanceOf(this)
    .sub(TotalRSCSupply
    .sub(RSC.balanceOf(this))
    .mul(10)
      .div(32)
    );
    DIP.transfer(owner, unusedBonus);
  }

}

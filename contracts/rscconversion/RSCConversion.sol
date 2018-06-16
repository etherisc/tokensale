/**
 * @title RSC Conversion Contract
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity 0.4.24;

import "../token/DipToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20.sol";


contract RSCConversion is Ownable {

  using SafeMath for *;

  DipToken DIP;
  ERC20 RSC;
  uint256 lockInTime1;
  uint256 constant TotalRSCSupply = 319999999; // TODO: insert exact number

  mapping(address => uint256) lockedTokens;

  event Conversion(uint256 _rscAmount, uint256 _dipAmount);
  event Conversion_with_bonus(uint256 _rscAmount, uint256 _dipAmount);
  event Unlocked(address _beneficiary, uint256 _dipAmount);

  constructor (address _dipToken, address _rscToken, uint256 _lockInTime1) public {
    DIP = DipToken(_dipToken);
    RSC = ERC20(_rscToken);
    lockInTime1 = _lockInTime1;
  }


  function convert(uint256 _rscAmount) public returns(uint256 _dipAmount) {
    require(RSC.transferFrom(msg.sender, this, _rscAmount));
    _dipAmount = _rscAmount.mul(10).div(32);
    require(DIP.transfer(msg.sender, _dipAmount));
    emit Conversion(_rscAmount, _dipAmount);
  }

  function convert_with_bonus(uint256 _rscAmount) public returns(uint256 _dipAmount) {
    require(now < lockInTime1);
    require(RSC.transferFrom(msg.sender, this, _rscAmount));
    _dipAmount = _rscAmount.mul(125).div(320);
    lockedTokens[msg.sender] = _dipAmount;
    emit Conversion_with_bonus(_rscAmount, _dipAmount);
  }

  function unlock() public {
    uint256 amount;
    require(now >= lockInTime1);
    amount = lockedTokens[msg.sender];
    require(amount > 0);
    lockedTokens[msg.sender] = 0;
    require(DIP.transfer(msg.sender, amount));
    emit Unlocked(msg.sender, amount);
  }

  function unlockFor(address _beneficiary) public onlyOwner {
    require(now >= lockInTime1);
    uint256 amount = lockedTokens[_beneficiary];
    require(amount > 0);
    lockedTokens[_beneficiary] = 0;
    require(DIP.transfer(_beneficiary, amount));
    emit Unlocked(_beneficiary, amount);
  }

  function reclaimUnusedBonus() public onlyOwner {
    require(now >= lockInTime1);
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

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
  address DIP_Pool;

  event Conversion(uint256 _rscAmount, uint256 _dipAmount, uint256 _bonus);

  constructor (
      address _dipToken,
      address _dipTge,
      address _rscToken,
      address _dipPool) public {
    DIP = DipToken(_dipToken);
    DIP_TGE = DipTge(_dipTge);
    RSC = ERC20(_rscToken);
    DIP_Pool = _dipPool;
  }

  /* fallback function converts all RSC */
  function () public {
    convert(RSC.balanceOf(msg.sender));
  }

  function convert(
    uint256 _rscAmount
  ) public {

    uint256 allowance;
    uint256 bonus;
    uint256 lockupPeriod;
    uint256 dipAmount;

    (allowance, /* contributionAmount */, /* tokensIssued */, /* airDrop */, bonus, lockupPeriod) =
      DIP_TGE.contributorList(msg.sender);

    require(allowance > 0);
    require(RSC.transferFrom(msg.sender, DIP_Pool, _rscAmount));
    dipAmount = _rscAmount.mul(10).div(32);

    if (bonus > 0) {
      assert(lockupPeriod == 1);
      dipAmount = dipAmount.add(dipAmount.mul(100).div(bonus));
    }
    require(DIP.transferFrom(DIP_Pool, msg.sender, dipAmount));
    emit Conversion(_rscAmount, dipAmount, bonus);
  }

  /**
   * Owner can transfer back tokens which have been sent to this contract by mistake.
   * @param  _token address of token contract of the respective tokens
   * @param  _to where to send the tokens
   */
  function salvageTokens(ERC20 _token, address _to) onlyOwner external {
    _token.transfer(_to, _token.balanceOf(this));
  }

}
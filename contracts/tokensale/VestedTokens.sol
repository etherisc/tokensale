/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "../tokensale/TokenTimelock.sol";


contract VestedTokens is TokenTimelock {
  using SafeMath for uint256;

  uint256 vestingPeriod;
  uint256 cliff;
  uint256 numberOfPeriods;
  address granter;
  // uint256 UpperBound = 25;

  function VestedTokens(address _granter, uint256 _vestingPeriod, uint256 _cliff) {

    granter = _granter;
    vestingPeriod = _vestingPeriod; // e.g. 2 years
    cliff = _cliff; // e.g. 6 months
    numberOfPeriods = vestingPeriod.div(cliff);

    require(vestingPeriod == cliff.mul(numberOfPeriods));
    // require(numberOfPeriods < UpperBound); // no unbounded for loops

  }

  // precondition: granter has approved this contract to the amount to be granted
  function grant(address _beneficiary, uint256 _amount, uint256 _startTime) onlyOwner {

    uint256 part = _amount.div(numberOfPeriods);
    require(_amount == (part.mul(numberOfPeriods)));

    for (uint256 period = 1; period <= numberOfPeriods; period++) {
      setTimelock(granter, _beneficiary, _startTime + period.mul(cliff), part);
    }

  }


}

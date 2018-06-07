/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "../tokensale/TokenTimelock.sol";


contract VestedTokens is TokenTimelock {
  using SafeMath for uint256;

  // uint256 UpperBound = 25; // could be implemented to limit the numberOfPeriods

  event GrantGiven(address _beneficiary, uint256 _amount, uint256 _startTime, uint256 _cliff, uint256 _vestingPeriod);

  constructor(StandardToken _token) public TokenTimelock(_token) {
    // nothing to do; Constructor is only used to pass constructor argument
  }

  // precondition: granter has approved this contract to the amount to be granted
  function grant(
    address _beneficiary,
    uint256 _amount,
    uint256 _startTime,
    uint256 _cliff,
    uint256 _vestingPeriod
    ) public
    {

    uint256 numberOfPeriods = _vestingPeriod.div(_cliff);
    uint256 part = _amount.div(numberOfPeriods);
    require(_amount == (part.mul(numberOfPeriods)));

    for (uint256 period = 1; period <= numberOfPeriods; period++) {
      setTimelockFor(_beneficiary, _startTime.add(period.mul(_cliff)), part);
    }

    emit GrantGiven(_beneficiary, _amount, _startTime, _cliff, _vestingPeriod);
  }

}

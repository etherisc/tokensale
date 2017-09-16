/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "../../contracts/tokensale/TokenTimelock.sol";


contract TokenTimelockMock is TokenTimelock {
  
  bool public lastResult;
  event LogUint(uint _uint);

  function TokenTimelockMock(StandardToken _token) TokenTimelock(_token) {
    // nothing to do; Constructor is only used to pass constructor argument
  }

  function releaseTimelockFor(address _beneficiary, uint256 _releaseTime, uint256 _value) returns (bool) {
    LogUint(now);
    lastResult = super.releaseTimelockFor(_beneficiary, _releaseTime, _value); 
    return lastResult;
  }

  function releaseTimelock(uint256 _releaseTime, uint256 _value) returns (bool) {
    LogUint(now);
    lastResult = super.releaseTimelock(_releaseTime, _value);
    return lastResult;
  } 

}

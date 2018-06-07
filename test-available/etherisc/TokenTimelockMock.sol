/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity 0.4.24;

import "../../contracts/tokensale/TokenTimelock.sol";


contract TokenTimelockMock is TokenTimelock {

  bool public lastResult;
  event LogUint(uint _uint);

  constructor(StandardToken _token) TokenTimelock(_token) public {
    // nothing to do; Constructor is only used to pass constructor argument
  }

  function releaseTimelockFor(address _beneficiary, uint256 _releaseTime, uint256 _value) public returns (bool) {
    emit LogUint(now);
    lastResult = super.releaseTimelockFor(_beneficiary, _releaseTime, _value);
    return lastResult;
  }

  function releaseTimelock(uint256 _releaseTime, uint256 _value) public returns (bool) {
    emit LogUint(now);
    lastResult = super.releaseTimelock(_releaseTime, _value);
    return lastResult;
  }

}

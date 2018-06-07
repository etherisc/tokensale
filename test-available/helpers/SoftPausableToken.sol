pragma solidity 0.4.24;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/lifecycle/Pausable.sol';

/**
 * Soft Pausable token (does not throw if paused)
 *
 * Simple ERC20 Token example, with pausable token creation
 **/

contract SoftPausableToken is StandardToken, Pausable {

  function transfer(address _to, uint _value) public returns (bool) {
    if (paused) {
      return false;
    } else {
      return super.transfer(_to, _value);
    }
  }

  function transferFrom(address _from, address _to, uint _value) public returns (bool) {
    if (paused) {
      return false;
    } else {
      return super.transferFrom(_from, _to, _value);
    }
  }
}

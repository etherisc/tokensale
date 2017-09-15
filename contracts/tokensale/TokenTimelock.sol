/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "../protocol/TokenStake.sol";


contract TokenTimelock is TokenStake, Ownable {
  
  using SafeMath for uint256;

  mapping (address => mapping(uint256 => uint256)) public releaseTime;

  event TimeLocked(address _staker, uint256 _releaseTime, uint256 _value);
  event TimeUnlocked(address _beneficiary, uint256 _releaseTime, uint256 _value);


  function TokenTimelock(StandardToken _token) TokenStake(_token) {
    // nothing to do; Constructor is only used to pass constructor argument
  }

  /**
   * Timelock tokens for a given staker.
   * This function can (successfully) only be called by an address which has allowance for _value of tokens.
   * @param _staker      address who will receive tokens after locking period
   * @param _releaseTime timestamp after which the tokens are unlocked
   * @param _value       amount of tokens
   */
  function setTimelockFor(address _staker, uint256 _releaseTime, uint256 _value) {
    require(stakeFor(_staker, _value));
    releaseTime[_staker][_releaseTime] = releaseTime[_staker][_releaseTime].add(_value);
    TimeLocked(_staker, _releaseTime, _value);
  }

  /**
   * Timelock tokens for oneself.
   * @param _releaseTime timestamp after which tokens are unlocked
   * @param _value       amount of tokens
   */
  function setTimelock(uint256 _releaseTime, uint256 _value) {
    setTimelockFor(msg.sender, _releaseTime, _value);
  }

  /**
   * Release locked tokens and transfer them to a given beneficiary.
   * @param  _beneficiary receiver of released tokens.
   * @param  _releaseTime timestamp
   * @param  _value amount of tokens to be released
   * @return true on success.
   */
  function releaseTimelockFor(address _beneficiary, uint256 _releaseTime, uint256 _value) returns (bool) {
    require(now >= _releaseTime);
    releaseTime[msg.sender][_releaseTime] = releaseTime[msg.sender][_releaseTime].sub(_value); // will throw if result < 0
    if (releaseFor(_beneficiary, _value)) {
      TimeUnlocked(_beneficiary, _releaseTime, _value);
      return true;
    } else {
      releaseTime[msg.sender][_releaseTime] = releaseTime[msg.sender][_releaseTime].add(_value);
      return false;
    }
  }

  /**
   * Release locked tokens for oneself.
   * @param _releaseTime timestamp
   * @param _value amount of tokens to be released
   * @return true on success.
   */
  function releaseTimelock(uint _releaseTime, uint256 _value) returns (bool) {
    return releaseTimelockFor(msg.sender, _releaseTime, _value);
  } 

}

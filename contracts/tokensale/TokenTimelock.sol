/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../protocol/TokenStake.sol";


contract TokenTimelock is TokenStake, Ownable {
  
  using SafeMath for uint256;

  mapping (address => mapping(uint256 => uint256)) releaseTime;

  function setTimelock(address _sender, address _staker, uint256 _releaseTime, uint256 _value) {
    if (stake(_sender, _staker, _value)) {
      releaseTime[_staker][_releaseTime].add(_value);
    }
  }

  function releaseTimelock(address _staker, uint _releaseTime, uint256 _value) {
    require(now >= _releaseTime);
    releaseTime[_staker][_releaseTime].sub(_value); // will throw if result < 0
    release(_staker, _value);
  }

}

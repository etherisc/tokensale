
pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "../../contracts/protocol/TokenStake.sol";

/**
 * Just making the internal functions public
 */
contract TokenStakeMock is TokenStake {
  
  using SafeMath for uint256;

  bool public lastResult;

  function TokenStakeMock(StandardToken _token) TokenStake(_token) {

  }

  function doStakeFor(address _sender, address _staker, uint256 _value) public returns (bool) {
    lastResult = stakeFor(_sender, _staker, _value);
    return lastResult;
  }

  function doStake(address _staker, uint256 _value) public returns (bool) {
    lastResult = stake(_staker, _value);
    return lastResult;
  }

  function doReleaseFor(address _beneficiary, address _staker, uint _value) public returns (bool) {
    lastResult = releaseFor(_beneficiary, _staker, _value);
    return lastResult;
  }

  function doRelease(address _staker, uint _value) public returns (bool) {
    lastResult = release(_staker, _value);
    return lastResult;
  }

}

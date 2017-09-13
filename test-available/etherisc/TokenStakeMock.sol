
pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "../../contracts/protocol/TokenStake.sol";

/**
 * Just making the internal functions public
 */
contract TokenStakeMock is TokenStake {
  
  using SafeMath for uint256;

  function TokenStakeMock(StandardToken _token) TokenStake(_token) {

  }

  function doStake(address _sender, address _staker, uint256 _value) public returns (bool) {
    return stake(_sender, _staker, _value);
  }

  function doReleaseFor(address _beneficiary, address _staker, uint _value) public returns (bool) {
    return releaseFor(_beneficiary, _staker, _value);
  }

  function doRelease(address _staker, uint _value) public returns (bool) {
    return release(_staker, _value);
  }

}

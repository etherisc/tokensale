/**
 * @title Generic Token Staking Contract
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";

/**
 * TokenStake Contract.
 * This contract has to be extended to be useful, as
 * all of its functions are internal.
 */
contract TokenStake {

  using SafeMath for uint256;

  StandardToken token;
  mapping (address => uint256) staked;

  event Staked(address _staker, uint256 _value);
  event Released(address _staker, address _beneficiary, uint256 _value);

  function TokenStake (StandardToken _token) {
    token = _token;
  }

  // requires approval of token transfer before calling this function
  function stake(address _sender, address _staker, uint256 _value) internal returns (bool) {
    if (token.transferFrom(_sender, this, _value)) {
      staked[_staker] = staked[_staker].add(_value);
      Staked(_staker, _value);
      return true;
    }
    return false;
  }

  function releaseFor(address _beneficiary, address _staker, uint _value) internal returns (bool) {
    if (staked[_staker] > _value) {
      staked[_staker].sub(_value);
      if (token.transfer(_beneficiary, _value)) {
        Released(_staker, _beneficiary, _value);
        return true;
      } else {
        staked[_staker].add(_value);
        return false;
      }
    } 
  }

  function release(address _staker, uint _value) internal returns (bool) {
    return releaseFor(_staker, _staker, _value);
  }

  function stakedOf(address _staker) constant returns (uint256) {
    return staked[_staker];
  }

}

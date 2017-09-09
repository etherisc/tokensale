/**
 * @title Generic Token Staking Contract
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";


contract TokenStakeERC20 {
  using SafeMath for uint256;

  StandardToken token;
  mapping (address => uint256) staked;

  event Staked(address _staker, uint256 _value);
  event Released(address _staker, address _beneficiary, uint256 _value);

  modifier onlyToken {
    require (msg.sender == address(token));
    _;
  }

  function TokenStakeERC20 (StandardToken _token) {
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

  // this functions should be overridden with custom logic
  function release(address _staker, address _beneficiary, uint _value) internal {
    if (staked[_staker] > _value) {
      staked[_staker].sub(_value);
      token.transfer(_beneficiary, _value);
      Released(_staker, _beneficiary, _value);    
    } 
  }

  function release(address _staker, uint _value) internal {
    release(_staker, _staker, _value);
  }

  function stakedOf(address _staker) constant returns (uint256) {
    return staked[_staker];
  }

}

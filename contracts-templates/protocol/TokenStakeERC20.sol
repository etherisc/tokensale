/**
 * @title Generic Token Staking Contract
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');

contract TokenStake {
  using SafeMath for uint256;

  StandardToken token;
  mapping (address => uint256) staked;

  event Staked(address _staker, uint256 _value);
  event Released(address _staker, uint256 _value);

  modifier onlyToken {
    require (msg.sender == token.address); 
  }

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

  // this function should be overridden with custom logic
  function release(address _staker, uint _value) {
    if (staked[_staker] > _value) {
      staked[_staker].sub(_value);
      token.transfer(_staker, _value);
      Released(_staker, _value);    
    } 
  }

  function stakedOf(address _staker) constant returns (uint256) {
    return staked[_staker];
  }

}

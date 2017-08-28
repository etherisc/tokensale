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

  function TokenStake (ERC23Token _token) {
    token = _token;
  } 

  function tokenFallback(address _sender, uint _value, bytes _data) onlyToken {
    stake(_sender, _value, _data)
  }

  // could be overridden in case you need to do something with _data
  function stake(address _sender, uint256 _value, bytes _data) internal returns (bool){
    staked[_sender] = staked[_sender].add(_value);
    Staked(_staker, _value);
    return true;
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


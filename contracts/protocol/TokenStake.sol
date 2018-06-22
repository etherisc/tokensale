/**
 * @title Generic Token Staking Contract
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";

/**
 * TokenStake Contract.
 * This contract has to be extended to be useful, as
 * the release functions are internal.
 * We expect the owner of this contract to check if the used token
 * is not an "attacking" token.
 */
contract TokenStake {

  using SafeMath for uint256;

  StandardToken token;
  mapping (address => uint256) public staked;

  event Staked(address _staker, uint256 _value);
  event Released(address _beneficiary, uint256 _value);

  constructor(StandardToken _token) public {
    token = _token;
  }

  // requires approval of token transfer before calling this function
  function stakeFor(address _staker, uint256 _value) public returns (bool) {
    if (token.transferFrom(msg.sender, address(this), _value)) {
      staked[_staker] = staked[_staker].add(_value);
      emit Staked(_staker, _value);
      return true;
    } else {
      return false;
    }
  }

  function stake(uint256 _value) public returns (bool) {
    return stakeFor(msg.sender, _value);
  }

  function releaseFor(address _beneficiary, uint256 _value) internal returns (bool) {
    staked[msg.sender].sub(_value); // will throw if _value > staked[_staker]
    if (token.transfer(_beneficiary, _value)) {
      emit Released(_beneficiary, _value);
      return true;
    } else {
      staked[msg.sender].add(_value);
      return false;
    }
  }

  function release(uint256 _value) internal returns (bool) {
    return releaseFor(msg.sender, _value);
  }

}

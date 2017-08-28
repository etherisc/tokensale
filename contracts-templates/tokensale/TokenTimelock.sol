/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');

contract TokenTimelock is TokenStakeERC20, Ownable {

  mapping (address => mapping(uint256 => uint256)) releaseTime;

  function setTimelock(address _sender, address _staker, uint256 _releaseTime, uint256 _value) {
  	if (stake(_sender, _staker, _value)) {
	  	releaseTime[_staker][_releaseTime] = _value;
  	}
  }

  function release(address _staker, uint256 _value) {
    if (releaseTime[_staker][now] >= _value) super.release(_staker, _value)
  }
}
/**
 * @title Generic Token Time Lock
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');

contract TokenTimelock is TokenStakeERC20, Ownable {
  using SafeMath for uint256;

  mapping (address => mapping(uint256 => uint256)) releaseTime;

  function setTimelock(address _sender, address _staker, uint256 _releaseTime, uint256 _value) {
    if (stake(_sender, _staker, _value)) {
      releaseTime[_staker][_releaseTime].add(_value);
    }
  }

  function release(address _staker, uint256 _value) {
    releaseTime[_staker][now].sub(_value); // will throw if result < 0
    super.release(_staker, _value);
  }

}
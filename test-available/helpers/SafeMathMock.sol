pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract SafeMathMock {
  uint public result;

  function multiply(uint a, uint b) public {
    result = SafeMath.mul(a, b);
  }

  function subtract(uint a, uint b) public {
    result = SafeMath.sub(a, b);
  }

  function add(uint a, uint b) public {
    result = SafeMath.add(a, b);
  }
}

pragma solidity ^0.4.15;


import '../helpers/SoftPausableToken.sol';


// mock class using StandardToken
contract SoftPausableTokenMock is SoftPausableToken {

  function SoftPausableTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
    paused = false;
  }

}

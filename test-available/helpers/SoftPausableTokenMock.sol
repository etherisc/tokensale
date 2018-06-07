pragma solidity 0.4.24;


import '../helpers/SoftPausableToken.sol';


// mock class using StandardToken
contract SoftPausableTokenMock is SoftPausableToken {

  constructor(address initialAccount, uint initialBalance) public {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
    paused = false;
  }

}

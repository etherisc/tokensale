pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/token/StandardToken.sol';


// mock class using StandardToken
contract StandardTokenMock is StandardToken {

  constructor(address initialAccount, uint initialBalance) public {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}

pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/token/BasicToken.sol';


// mock class using BasicToken
contract BasicTokenMock is BasicToken {

  constructor(address initialAccount, uint initialBalance) public  {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}

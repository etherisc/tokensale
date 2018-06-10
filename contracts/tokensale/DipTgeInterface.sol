pragma solidity 0.4.24;


contract DipTgeInterface {

  function getLockInTime2() public returns (uint256);

  function getContributorAllowance(address _contributor) public constant returns (uint256 _allowance);

  function tokenIsLocked(address _contributor) public constant returns (bool);

  function allocateForExchange(address _beneficiary, uint256 _amount) public;

  function conversionIsAllowed(address _contributor) public constant returns (bool);
}

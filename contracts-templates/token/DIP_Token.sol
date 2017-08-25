/**
 * @title DIP Token
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');


import "./VestedToken.sol";


contract DIP_Token is VestedToken {

  string public name = "DecentralizedInsurance";
  string public symbol = "DIP";
  uint256 public decimals = 18;
  uint256 public INITIAL_SUPPLY = 100000000; // 100 Million 100'000'000

  /**
   * @dev Contructor that gives msg.sender all of existing tokens. 
   */
  function DIP_Token() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

}

/**
 * @title DIP Token
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "zeppelin-solidity/contracts/token/PausableToken.sol";


contract DipToken is PausableToken, MintableToken {

  string public name = "DecentralizedInsurance";
  string public symbol = "DIP";
  uint256 public decimals = 18;
  // uint256 public MAXIMUM_SUPPLY = 10**8 * 10**18; // 100 Million 100'000'000
  uint256 public MAXIMUM_SUPPLY = 10**11 * 10**18; // 100 Billion 100'000'000'000

  /**
   * @dev Function to mint tokens
   * @param _to The address that will recieve the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) returns (bool) {
    if (totalSupply.add(_amount) > MAXIMUM_SUPPLY) 
      return false;
    return super.mint(_to, _amount);
  }

  

}

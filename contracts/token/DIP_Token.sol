/**
 * @title DIP Token
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import "../../installed_contracts/zeppelin/contracts/token/MintableToken.sol";
import "../../installed_contracts/zeppelin/contracts/token/PausableToken.sol";


contract DIP_Token is PausableToken, MintableToken {

  string public name = "DecentralizedInsurance";
  string public symbol = "DIP";
  uint256 public decimals = 18;
  uint256 public MAXIMUM_SUPPLY = 100000000; // 100 Million 100'000'000


  // TODO: Fix ERC20 short address attack (should WE fix this??)
  /*
    modifier onlyPayloadSize(uint size) {
      assert(msg.data.length == size + 4);
      _;
    function transfer(address _to, uint256 _value) onlyPayloadSize(2 * 32) {
    // do stuff
  }
   }
  */


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

/**
 * @title DIP Token
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "zeppelin-solidity/contracts/token/PausableToken.sol";


contract DipToken is PausableToken, MintableToken {

  string public constant name = "Decentralized Insurance Protocol";
  string public constant symbol = "DIP";
  uint256 public constant decimals = 18;
  uint256 public constant MAXIMUM_SUPPLY = 10**9 * 10**18; // 1 Billion 1'000'000'000

  /**
   * @dev Function to mint tokens
   * @param _to The address that will recieve the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) public returns (bool) {
    if (totalSupply.add(_amount) > MAXIMUM_SUPPLY) 
      return false;
    return super.mint(_to, _amount);
  }

  /**
   * Owner can transfer back tokens which have been sent to this contract by mistake.
   * @param  _token address of token contract of the respective tokens
   * @param  _to where to send the tokens
   */
  function salvageTokens(ERC20Basic _token, address _to) public onlyOwner {
    _token.transfer(_to, _token.balanceOf(this));
  }

}

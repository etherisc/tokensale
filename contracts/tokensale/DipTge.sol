/**
 * @title DIP Token Generating Event
 * @notice The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import '../../installed_contracts/zeppelin/contracts/math/SafeMath.sol';
import "../../installed_contracts/zeppelin/contracts/token/MintableToken.sol";
import "../../installed_contracts/zeppelin/contracts/crowdsale/FinalizableCrowdsale.sol";
import "../token/DipToken.sol";
import "./DipWhitelistedCrowdsale.sol";


contract DIP_TGE is WhitelistedCrowdsale, FinalizableCrowdsale {

  using SafeMath for uint256;

  uint256 rate;

  /**
   * [DIP_TGE description]
   * @param _startBlock start Block for TGE
   * @param _endBlock   end Block for TGE
   * @param _rate       conversion rate ETH->DIP, how many DIP for 1 ETH?
   * @param _wallet     address of wallet to keep funds
   * @param _hardcap1   hardcap for priority pass 
   * @param _hardcap2   hardcap overall
   */
  function DIP_TGE (
    uint256 _startBlock,
    uint256 _startOpenPpBlock,
    uint256 _startPublicBlock,
    uint256 _endBlock,
    uint256 _rate,
    address _wallet,
    uint256 _hardcap1,    // for priorityPass
    uint256 _hardcap2     // overall hardcap
    ) 
    DipWhitelistedCrowdsale(_startBlock, _startOpenPpBlock, _startPublicBlock, _endBlock,_hardcap1, _hardcap2, _wallet) 
    FinalizableCrowdsale() 
  {

    require(_rate > 0);
    rate = _rate;

    DIP_Token(token).pause();

  }

  /**
   * Creates an new ERC20 Token contract for the DIP Token.
   * @return the created token
   */
  function createTokenContract() internal returns (MintableToken) {
    return new DIP_Token();
  }

  /**
   * Finalize sale and perform cleanup actions.
   */
  function finalization() internal {
    token.mint(wallet, token.MAXIMUM_SUPPLY.sub(token.totalSupply)); // Alternativly, hardcode remaining token distribution.
    token.finishMinting();
  }

  /**
   * Owner can transfer back tokens which have been sent to this contract by mistake.
   * @param  _token address of token contract of the respective tokens
   * @param  _to where to send the tokens
   */
  function salvageTokens(ERC20Basic _token, address _to) onlyOwner {
    _token.transfer(_to, _token.balanceOf(this))
  }

}

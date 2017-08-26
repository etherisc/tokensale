/**
 * @title DIP Token Generating Event
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');

import "../../installed_contracts/zeppelin/contracts/token/MintableToken.sol";
import "../../installed_contracts/zeppelin/contracts/crowdsale/Crowdsale.sol";
import "../../installed_contracts/zeppelin/contracts/crowdsale/FinalizableCrowdsale.sol";
import "../../installed_contracts/zeppelin/contracts/crowdsale/CappedCrowdsale.sol";
import "../token/DIP_Token.sol";
import "./WhitelistedCrowdsale.sol";

contract DIP_TGE is WhitelistedCrowdsale, CappedCrowdsale, FinalizableCrowdsale {

  uint256 rate;

  function DIP_TGE (
    uint256 _startBlock,
    uint256 _endBlock,
    uint256 _rate,
    address _wallet,
    uint256 _hardcap
    ) 
  CappedCrowdsale(_hardcap)
  WhitelistedCrowdsale()
  FinalizableCrowdsale()
  Crowdsale(_startBlock, _endBlock, _rate, _wallet) {

    require(_rate > 0);
    rate = _rate;

    DIP_Token(token).pause();

  }

  function createTokenContract() internal returns (MintableToken) {
    return new DIP_Token();
  }

  // overriding Crowdsale#validPurchase to add whitelist logic
  // @return true if buyers can buy at the moment
  function validPurchase() internal constant returns (bool) {
    // only whitelisted buyers can buy
    return (!hasEnded() && isWhitelisted(msg.sender)); 
  }


  // end token minting on finalization
  // override this with custom logic if needed
  function finalization() internal {
    token.finishMinting();
  }


}
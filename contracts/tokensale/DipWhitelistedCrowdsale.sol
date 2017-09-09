/**
 * @title DIP Token Generating Event
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';


contract DipWhitelistedCrowdsale is Crowdsale, Ownable {
  
  using SafeMath for uint256;

  enum state { pendingStart, priorityPass, openedPriorityPass, crowdsale, crowdsaleEnded }

  uint256 public startOpenPpBlock;
  uint256 public startPublicBlock;
  uint256 public minCap;
  uint256 public hardCap1;
  uint256 public hardCap2;

  state public crowdsaleState = state.pendingStart;

  struct ContributorData {
    uint256 priorityPassAllowance;
    uint256 otherAllowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
  }

  // list of addresses that can purchase in priorityPass phase  
  mapping (address => ContributorData) public contributorList;
  // counter for contributors
  uint256 nextContributorIndex;
  // ordered list to make it accessible
  mapping (uint256 => address) contributorIndexes;

  event DipTgeStarted(uint256 _blockNumber);
  event OpenPpStarted(uint256 _blockNumber);
  event PublicStarted(uint256 _blockNumber);
  event MinCapReached(uint256 _blockNumber);
  event HardCap1Reached(uint256 _blockNumber);
  event HardCap2Reached(uint256 _blockNumber);
  event DipTgeEnded(uint256 _blockNumber);


  /**
   * Constructor
   * @param _startOpenPpBlock starting block for open PriorityPass phase
   * @param _startPublicBlock starting block for public phase
   * @param _minCap           minimum goal (only info)
   * @param _hardCap1         hardcap for priority phase
   * @param _hardCap2         hardcap overall
   */
  
  function DipWhitelistedCrowdsale(
    uint256 _startOpenPpBlock,
    uint256 _startPublicBlock, 
    uint256 _minCap,
    uint256 _hardCap1, 
    uint256 _hardCap2
    ) 
  {
    startOpenPpBlock = _startOpenPpBlock;
    startPublicBlock = _startPublicBlock;
    minCap = _minCap;
    hardCap1 = _hardCap1;
    hardCap2 = _hardCap2;
  }

  /**
   * Push contributor data to the contract before the crowdsale so that they are eligible for priorit pass
   * 
   */
  function editContributors(
    address[] _contributorAddresses, 
    uint256[] _contributorPPAllowances, 
    uint256[] _contributorOtherAllowance) 
    onlyOwner 
    {
    
    require(
      _contributorAddresses.length == _contributorPPAllowances.length && 
      _contributorAddresses.length == _contributorOtherAllowance.length
      ); // Check if input data is consistent

    for(uint cnt = 0; cnt < _contributorAddresses.length; cnt++){
      contributorList[_contributorAddresses[cnt]].priorityPassAllowance = _contributorPPAllowances[cnt];
      contributorList[_contributorAddresses[cnt]].otherAllowance = _contributorOtherAllowance[cnt];
      // TODO: Fix this! 
      contributorIndexes[nextContributorIndex] = _contributorAddresses[cnt];
      nextContributorIndex++;
    }
  }

  /**
   * Calculate the maximum remaining contribution allowed for an address
   * @param  _contributor the address of the contributor
   * @return maxContribution maximum allowed amount in wei
   */
  function calculateMaxContribution(address _contributor) constant returns (uint256 maxContribution){
    uint256 maxContrib;
    if (crowdsaleState == state.priorityPass){
      maxContrib = contributorList[_contributor].priorityPassAllowance - contributorList[_contributor].contributionAmount;
      if (maxContrib > hardCap1 - weiRaised){
        maxContrib = hardCap1 - weiRaised;
      }
    }
    else{
      maxContrib = hardCap2 - weiRaised;
    }
    return maxContrib;
  }

  function setCrowdsaleState() {
    if (weiRaised >= hardCap2 && crowdsaleState != state.crowdsaleEnded){
      crowdsaleState = state.crowdsaleEnded;
      HardCap2Reached(block.number);
      DipTgeEnded(block.number);
    }

    if (block.number >= startBlock && block.number < startOpenPpBlock){
      if (crowdsaleState != state.priorityPass) {
        crowdsaleState = state.priorityPass;
        DipTgeStarted(block.number);
      }
    } else if (block.number >= startOpenPpBlock && block.number < startPublicBlock){
      if (crowdsaleState != state.openedPriorityPass) {
        crowdsaleState = state.openedPriorityPass;
        OpenPpStarted(block.number);
      }
    } else if (block.number >= startPublicBlock && block.number <= endBlock){        
      if (crowdsaleState != state.crowdsale) {                                       
        crowdsaleState = state.crowdsale;
        PublicStarted(block.number);
      }
    } else {
      if (crowdsaleState != state.crowdsaleEnded && block.number > endBlock){
        crowdsaleState = state.crowdsaleEnded;
        DipTgeEnded(block.number);
      }
    }
  }

  /**
   * The token buying function.
   * @param  _beneficiary  receiver of tokens.
   */
  function buyTokens(address _beneficiary) payable {
    require(_beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;
    uint256 maxContrib = calculateMaxContribution(_beneficiary);
    uint256 refund;

    if (weiAmount > maxContrib) {
      refund = weiAmount.sub(maxContrib);
      weiAmount = maxContrib;
    }

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    // update state
    weiRaised = weiRaised.add(weiAmount);
    if (weiRaised > minCap)
      MinCapReached(block.number);

    if (!token.mint(_beneficiary, tokens)) revert();
    TokenPurchase(msg.sender, _beneficiary, weiAmount, tokens);

    contributorList[_beneficiary].contributionAmount = contributorList[_beneficiary].contributionAmount.add(weiAmount);
    contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(tokens);

    wallet.transfer(weiAmount);
    if (refund != 0) msg.sender.transfer(refund);
  }


  /**
   * Returns true if a purchase is valid, i.e. there is *some* allowed amount remaining for the contributor
   * @return bool
   */
  function validPurchase() internal constant returns (bool) {
    setCrowdsaleState();
    return super.validPurchase();
  }

}

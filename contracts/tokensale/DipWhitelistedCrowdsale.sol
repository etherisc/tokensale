/**
 * @title DIP Token Generating Event
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.11;

import '../../installed_contracts/zeppelin/contracts/math/SafeMath.sol';
import '../../installed_contracts/zeppelin/contracts/crowdsale/Crowdsale.sol';


contract DipWhitelistedCrowdsale is Crowdsale, Ownable {
  
  using SafeMath for uint256;

  enum state { pendingStart, priorityPass, openedPriorityPass, crowdsale, crowdsaleEnded }

  uint256 public _startOpenPpBlock;
  uint256 public _startPublicBlock;
  uint256 public hardCap1;
  uint256 public hardCap2;

  state public crowdsaleState = state.pendingStart;

  struct ContributorData {
    uint256 priorityPassAllowance;
    // uint256 communityAllowance; // remove this!
    uint256 otherAllowance;
    bool isActive;
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
  event HardCap1Reached(uint256 _blockNumber);
  event HardCap2Reached(uint256 _blockNumber);
  event DipTgeEnded(uint256 _blockNumber);


  /**
   * Constructor
   * @param _startBlock       starting block
   * @param _startOpenPpBlock starting block for open PriorityPass phase
   * @param _hardCap1         hardcap for priority phase
   * @param _hardCap2         hardcap overall
   * @param _rate             the conversion rate
   * @param _wallet           address of wallet to transfer funds
   */
  function DipWhitelistedCrowdsale(
    uint256 _startBlock, 
    uint256 _startOpenPpBlock,
    uint256 _startPublicBlock, 
    uint256 _endBlock, 
    uint256 _hardCap1, 
    uint256 _hardCap2, 
    uint256 _rate, 
    address _wallet
    ) 
    Crowdsale(_startBlock, _endBlock, _rate, _wallet) 
  {
    startOpenPpBlock = _startOpenPpBlock;
    startPublicBlock = _startPublicBlock;
    hardCap1 = _hardCap1;
    hardCap2 = _hardCap2;
  }

  /**
   * Push contributor data to the contract before the crowdsale so that they are eligible for priorit pass
   * 
   */
  function editContributors(
    address[] _contributorAddresses, 
    uint[] _contributorPPAllowances, 
    uint[] _contributorOtherAllowance) 
    onlyOwner 
    {
    
    require(
      _contributorAddresses.length == _contributorPPAllowances.length && 
      _contributorAddresses.length == _contributorOtherAllowance.length
      ); // Check if input data is consistent

    for(uint cnt = 0; cnt < _contributorAddresses.length; cnt++){
      contributorList[_contributorAddresses[cnt]].isActive = true;                                        // Activate contributor
      contributorList[_contributorAddresses[cnt]].priorityPassAllowance = _contributorPPAllowances[cnt];  // Set PP allowance
      contributorList[_contributorAddresses[cnt]].otherAllowance = _contributorOtherAllowance[cnt];// Set community whitelist allowance
      // TODO: Fix this! 
      contributorIndexes[nextContributorIndex] = _contributorAddresses[cnt];                              // Set users index
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
    if (crowdsaleState == state.priorityPass){    // Check if we are in priority pass
      maxContrib = contributorList[_contributor].priorityPassAllowance - contributorList[_contributor].contributionAmount;
      if (maxContrib > hardCap1 - weiRaised){   // Check if max contribution is more that max cap
        maxContrib = hardCap1 - weiRaised;        // Alter max cap
      }
    }
    else{
      maxContrib = hardCap2 - weiRaised;            // Alter max cap
    }
    return maxContrib;
  }

  function setCrowdsaleState() {
    if (weiRaised >= hardCap2 && crowdsaleState != state.crowdsaleEnded){                         // Check if max cap is reached
      crowdsaleState = state.crowdsaleEnded;
      HardCap2Reached(block.number);                                                              // Close the crowdsale
      DipTgeEnded(block.number);                                                             // Raise event
    }

    if (block.number >= startBlock && block.number < startOpenPpBlock){  // Check if we are in presale phase
      if (crowdsaleState != state.priorityPass) {                                          // Check if state needs to be changed
        crowdsaleState = state.priorityPass;                                              // Set new state
        DipTgeStarted(block.number);                                                     // Raise event
      }
    } else if (block.number >= startOpenPpBlock && block.number < startPublicBlock){ // Check if we are in presale unlimited phase
      if (crowdsaleState != state.openedPriorityPass) {                                          // Check if state needs to be changed
        crowdsaleState = state.openedPriorityPass;                                              // Set new state
        OpenPpStarted(block.number);                                                  // Raise event
      }
    } else if (block.number >= crowdsaleStartBlock && block.number <= endBlock){        // Check if we are in crowdsale state
      if (crowdsaleState != state.crowdsale) {                                                   // Check if state needs to be changed
        crowdsaleState = state.crowdsale;                                                       // Set new state
        PublicStarted(block.number);                                                         // Raise event
      }
    } else {
      if (crowdsaleState != state.crowdsaleEnded && block.number > endBlock){        // Check if crowdsale is over
        crowdsaleState = state.crowdsaleEnded;                                                  // Set new state
        DipTgeEnded(block.number);                                                           // Raise event
      }
    }
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

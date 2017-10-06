/**
 * @title DIP Token Generating Event
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';


contract DipWhitelistedCrowdsale is Crowdsale, Ownable {
  
  using SafeMath for uint256;

  enum state { pendingStart, priorityPass, openedPriorityPass, crowdsale, crowdsaleEnded }

  uint256 public startOpenPpTime;
  uint256 public startPublicTime;
  uint256 public hardCap1;
  uint256 public hardCap2;

  state public crowdsaleState = state.pendingStart;

  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
  }

  // list of addresses that can purchase in priorityPass phase  
  mapping (address => ContributorData) public contributorList;

  event DipTgeStarted(uint256 _time);
  event OpenPpStarted(uint256 _time);
  event PublicStarted(uint256 _time);
  event HardCap2Reached(uint256 _time);
  event DipTgeEnded(uint256 _time);
  event Whitelisted(address indexed _contributor, uint256 _allowance);


  /**
   * Constructor
   * @param _startOpenPpTime  starting Time for open PriorityPass phase
   * @param _startPublicTime  starting Time for public phase
   * @param _hardCap1         hardcap for priority phase
   * @param _hardCap2         hardcap overall
   */
  
  function DipWhitelistedCrowdsale (
    uint256 _startOpenPpTime,
    uint256 _startPublicTime, 
    uint256 _hardCap1, 
    uint256 _hardCap2
    ) public
  {
    startOpenPpTime = _startOpenPpTime;
    startPublicTime = _startPublicTime;
    hardCap1 = _hardCap1;
    hardCap2 = _hardCap2;
  }

  /**
   * Push contributor data to the contract before the crowdsale so that they are eligible for priorit pass
   * 
   */
  function editContributors (
    address[] _contributorAddresses, 
    uint256[] _contributorAllowance
    ) public 
    onlyOwner 
    {
    
    require(
      _contributorAddresses.length == _contributorAllowance.length
      ); // Check if input data is consistent

    for(uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)){
      contributorList[_contributorAddresses[cnt]].allowance = _contributorAllowance[cnt];
      Whitelisted(_contributorAddresses[cnt], _contributorAllowance[cnt]);
    }
  }

  /**
   * Calculate the maximum remaining contribution allowed for an address
   * @param  _contributor the address of the contributor
   * @return maxContribution maximum allowed amount in wei
   */
  function calculateMaxContribution(address _contributor) public constant returns (uint256) {

    uint256 maxContrib = 0;

    if (crowdsaleState == state.priorityPass) {
      maxContrib = 
        contributorList[_contributor].allowance.sub( 
            contributorList[_contributor].contributionAmount);
      if (maxContrib > hardCap1 - weiRaised){
        maxContrib = hardCap1.sub(weiRaised);
      }
    } else if (crowdsaleState == state.openedPriorityPass) {
      if (contributorList[_contributor].allowance > 0) {
        maxContrib = hardCap1.sub(weiRaised);
      }
    } else if (crowdsaleState == state.crowdsale) {
      maxContrib = hardCap2.sub(weiRaised);
    }

    return maxContrib;
  }

  /**
   * Set the current state of the crowdsale.
   */
  function setCrowdsaleState() public {

    if (weiRaised >= hardCap2 && crowdsaleState != state.crowdsaleEnded) {

      crowdsaleState = state.crowdsaleEnded;
      HardCap2Reached(now);
      DipTgeEnded(now);

    } else if (
      now >= startTime &&
      now < startOpenPpTime && 
      crowdsaleState != state.priorityPass
      ) {

      crowdsaleState = state.priorityPass;
      DipTgeStarted(now);

    } else if (
      now >= startOpenPpTime && 
      now < startPublicTime &&
      crowdsaleState != state.openedPriorityPass
      ) {

      crowdsaleState = state.openedPriorityPass;
      OpenPpStarted(now);

    } else if (
      now >= startPublicTime && 
      now <= endTime &&
      crowdsaleState != state.crowdsale
      ) {                     

      crowdsaleState = state.crowdsale;
      PublicStarted(now);

    } else if (
        crowdsaleState != state.crowdsaleEnded && 
        now > endTime
        ) {

        crowdsaleState = state.crowdsaleEnded;
        DipTgeEnded(now);
        
    }
  }

  /**
   * The token buying function.
   * @param  _beneficiary  receiver of tokens.
   */
  function buyTokens(address _beneficiary) public payable {
    require(_beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;
    uint256 maxContrib = calculateMaxContribution(_beneficiary);
    uint256 refund;

    if (weiAmount > maxContrib) {
      refund = weiAmount.sub(maxContrib);
      weiAmount = maxContrib;
    }

    // stop here if transaction does not yield tokens
    require(weiAmount > 0);

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    // update state
    weiRaised = weiRaised.add(weiAmount);

    require(token.mint(_beneficiary, tokens));
    TokenPurchase(msg.sender, _beneficiary, weiAmount, tokens);

    contributorList[_beneficiary].contributionAmount = contributorList[_beneficiary].contributionAmount.add(weiAmount);
    contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(tokens);

    wallet.transfer(weiAmount);

    if (refund != 0) _beneficiary.transfer(refund);

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

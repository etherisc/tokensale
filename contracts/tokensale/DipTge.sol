/**
 * @title DIP Token Generating Event
 * @notice The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 *
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity 0.4.24;


import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "zeppelin-solidity/contracts/crowdsale/FinalizableCrowdsale.sol";
import "../token/DipToken.sol";
import "./DipWhitelistedCrowdsale.sol";


contract DipTge is DipWhitelistedCrowdsale, FinalizableCrowdsale {

  using SafeMath for uint256;

  enum state { pendingStart, priorityPass, crowdsale, crowdsaleEnded }

  ERC20 RSC_token; // RSC token contract
  uint256 public startOpenPpTime;
  uint256 public hardCap;
  uint256 public lockInTime1; // token lock-in period for team, ECA, US accredited investors
  uint256 public lockInTime2; // token lock-in period for founders
  state public crowdsaleState = state.pendingStart;

  event DipTgeStarted(uint256 _time);
  event CrowdsaleStarted(uint256 _time);
  event HardCapReached(uint256 _time);
  event DipTgeEnded(uint256 _time);
  event TokenAllocated(address _beneficiary, uint256 _amount);
  event RSC_Conversion(address _rsc, uint256 _rscAmount, uint256 _dipAmount);

  constructor(
    uint256 _startTime,
    uint256 _startOpenPpTime,
    uint256 _endTime,
    uint256 _lockInTime1,
    uint256 _lockInTime2,
    uint256 _hardCap,
    uint256 _rate,
    address _wallet,
    address _rscToken
  )
    Crowdsale(_startTime, _endTime, _rate, _wallet)
    public
  {
    // Check arguments
    require(_startTime >= now);
    require(_startOpenPpTime >= _startTime);
    require(_endTime >= _startOpenPpTime);
    require(_lockInTime1 >= _endTime);
    require(_lockInTime2 > _lockInTime1);
    require(_hardCap > 0);
    require(_rate > 0);
    require(_wallet != 0x0);
    require(_rscToken != 0x0);

    // Set contract fields
    startOpenPpTime = _startOpenPpTime;
    hardCap = _hardCap;
    lockInTime1 = _lockInTime1;
    lockInTime2 = _lockInTime2;
    RSC_token = ERC20(_rscToken);

    DipToken(token).pause();
  }

  function setRate(uint256 _rate) onlyOwner public {
    require(crowdsaleState == state.pendingStart);

    rate = _rate;
  }

  function unpauseToken() onlyOwner external {
    DipToken(token).unpause();
  }

  /**
   * Calculate the maximum remaining contribution allowed for an address
   * @param  _contributor the address of the contributor
   * @return maxContribution maximum allowed amount in wei
   */
  function calculateMaxContribution(address _contributor) public constant returns (uint256 _maxContribution) {
    uint256 maxContrib = 0;

    if (crowdsaleState == state.priorityPass) {
      maxContrib = contributorList[_contributor].allowance.sub(contributorList[_contributor].contributionAmount);

      if (maxContrib > hardCap.sub(weiRaised)) {
        maxContrib = hardCap.sub(weiRaised);
      }
    } else if (crowdsaleState == state.crowdsale) {
      if (contributorList[_contributor].allowance > 0) {
        maxContrib = hardCap.sub(weiRaised);
      }
    }

    return maxContrib;
  }

  /**
   * Calculate amount of tokens
   * @param _contributor the address of the contributor
   * @param _weiAmount contribution amount
   * @return _tokens amount of tokens
   */
  function calculateTokens(address _contributor, uint256 _weiAmount) public constant returns (uint256 _tokens) {
    uint256 bonus = getContributorBonus(_contributor);

    assert(bonus == 0 || bonus == 4 || bonus == 10);

    if (bonus > 0) {
      _tokens = _weiAmount.add(_weiAmount.div(bonus)).mul(rate);
    } else {
      _tokens = _weiAmount.mul(rate);
    }
  }

  /**
   * Set the current state of the crowdsale.
   */
  function setCrowdsaleState() public {
    if (weiRaised >= hardCap && crowdsaleState != state.crowdsaleEnded) {

      crowdsaleState = state.crowdsaleEnded;
      emit HardCapReached(now);
      emit DipTgeEnded(now);

    } else if (
      now >= startTime &&
      now < startOpenPpTime &&
      crowdsaleState != state.priorityPass
    ) {

      crowdsaleState = state.priorityPass;
      emit DipTgeStarted(now);

    } else if (
      now >= startOpenPpTime &&
      now <= endTime &&
      crowdsaleState != state.crowdsale
    ) {

      crowdsaleState = state.crowdsale;
      emit CrowdsaleStarted(now);

    } else if (
      crowdsaleState != state.crowdsaleEnded &&
      now > endTime
    ) {

      crowdsaleState = state.crowdsaleEnded;
      emit DipTgeEnded(now);
    }
  }

  /**
   * The token buying function.
   * @param  _beneficiary  receiver of tokens.
   */
  function buyTokens(address _beneficiary) public payable {
    require(_beneficiary != 0x0);
    require(validPurchase());
    require(contributorList[_beneficiary].distribution == Distribution.canBuy);

    setCrowdsaleState();

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
    uint256 tokens = calculateTokens(_beneficiary, weiAmount);

    assert(tokens > 0);

    // update state
    weiRaised = weiRaised.add(weiAmount);

    require(token.mint(_beneficiary, tokens));
    emit TokenPurchase(msg.sender, _beneficiary, weiAmount, tokens);

    contributorList[_beneficiary].contributionAmount = contributorList[_beneficiary].contributionAmount.add(weiAmount);
    contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(tokens);

    wallet.transfer(weiAmount);

    if (refund != 0) _beneficiary.transfer(refund);
  }

  function tokenIsLocked(address _contributor) public constant returns (bool) {

    if (now < lockInTime1 && contributorList[_contributor].lockupPeriod == 1) {
      return true;
    } else if (now < lockInTime2 && contributorList[_contributor].lockupPeriod == 2) {
      return true;
    }

    return false;

  }

  function conversionIsAllowed(address _contributor) public constant returns (bool) {
    return contributorList[_contributor].distribution == Distribution.canConvertRSC;
  }

  function airdrop() public {
    airdropFor(msg.sender);
  }

  function airdropFor(address _beneficiary) public {
    require(contributorList[_beneficiary].distribution == Distribution.getsAirdrop);
    require(contributorList[_beneficiary].tokensIssued == 0);
    require(contributorList[_beneficiary].allowance > 0);

    allocate(_beneficiary, contributorList[_beneficiary].allowance.mul(rate));
  }

  function allocate(address _beneficiary, uint256 _amount) internal {
    require(_beneficiary != 0x0);
    require(_amount > 0);

    setCrowdsaleState();

    require(crowdsaleState == state.crowdsaleEnded);

    require(token.mint(_beneficiary, _amount));
    emit TokenAllocated(_beneficiary, _amount);

    contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(_amount);
  }

  /**
   * Creates an new ERC20 Token contract for the DIP Token.
   * Overrides Crowdsale function
   * @return the created token
   */
  function createTokenContract() internal returns (MintableToken) {
    return new DipToken();
  }


  /**
   * Convert RSC Tokens in DIP Tokens.
   * Conversion factor is defined as 1 DIP = 3.2 RSC
   * @return the created token
   */
  function convertRSC(uint256 _rscAmount) public {
    require(_rscAmount > 0);
    require(conversionIsAllowed(msg.sender));
    require(getContributorAllowance(msg.sender) >= _rscAmount);
    require(RSC_token.transferFrom(msg.sender, wallet, _rscAmount));

    uint256 dipAmount = _rscAmount.mul(10).div(32);
    allocate(msg.sender, dipAmount);

    // TODO: Add bonus if eligible for bonus

    emit RSC_Conversion(msg.sender, _rscAmount, dipAmount);
  }


  /**
   * Finalize sale and perform cleanup actions.
   */
  function finalization() internal {
    uint256 maxSupply = DipToken(token).MAXIMUM_SUPPLY();
    token.mint(wallet, maxSupply.sub(token.totalSupply())); // Alternativly, hardcode remaining token distribution.
    token.finishMinting();
    token.transferOwnership(owner);
  }

  /**
   * Owner can transfer back tokens which have been sent to this contract by mistake.
   * @param  _token address of token contract of the respective tokens
   * @param  _to where to send the tokens
   */
  function salvageTokens(ERC20Basic _token, address _to) onlyOwner external {
    _token.transfer(_to, _token.balanceOf(this));
  }
}

/**
 * @title DIP Token Generating Event
 * @dev The Decentralized Insurance Platform Token.
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract DipWhitelistedCrowdsale is Ownable {
  using SafeMath for uint256;

  enum contributor {
    REGULAR,
    ECA, // bonus 10%
    RSC, // convert RSC token
    RSC_USA, // convert RSC token, 1 year lock-in
    ECA_LOCK, // 25% bonus, 1 year lock-in
    USA, // 1 year lock-in
    TEAM, // 1 year lock-in, airdrop
    FOUNDER // 2 years lock-in, airdrop
  }

  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    contributor contributorType;
  }

  mapping (address => ContributorData) public contributorList;

  event Whitelisted(address indexed _contributor, uint256 _allowance, contributor _type);

  /**
   * Push contributor data to the contract before the crowdsale
   */
  function editContributors (
    address[] _contributorAddresses,
    uint256[] _contributorAllowance,
    contributor[] _contributorTypes
  ) onlyOwner public {
    // Check if input data is consistent
    require(
      _contributorAddresses.length == _contributorAllowance.length &&
      _contributorAddresses.length == _contributorTypes.length
    );

    for (uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)) {
      contributorList[_contributorAddresses[cnt]].allowance = _contributorAllowance[cnt];
      contributorList[_contributorAddresses[cnt]].contributorType = _contributorTypes[cnt];

      emit Whitelisted(_contributorAddresses[cnt], _contributorAllowance[cnt], _contributorTypes[cnt]);
    }
  }

  function getContributorAllowance(address _contributor) public constant returns (uint256 _allowance) {
    _allowance = contributorList[_contributor].allowance;
  }

  function getContributorBonus(address _contributor) public constant returns (uint256 _bonus) {
    if (contributorList[_contributor].contributorType == contributor.ECA) {
      return 10; // bonus 10%
    }

    if (contributorList[_contributor].contributorType == contributor.ECA_LOCK) {
      return 4; // bonus 25%
    }

    return 0; // no bonus
  }
}

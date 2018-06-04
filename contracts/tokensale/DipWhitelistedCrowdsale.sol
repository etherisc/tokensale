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

  /*
   * Contributor's type:
   * 1: Regular
   * 2: ECA (bonus 10%)
   * 3: RSC holder
   * 4: RSC holder & accredited investor from USA (1 year lock-in)
   * 5: ECA & lock-in option (25%, 1 year lock-in)
   * 6: Accredited investor form USA (1 year lock-in)
   * 7: Team member (1 year lock-in, allocation)
   * 8: Founder (2 years lock-in, allocation)
   */
  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    uint256 contributorType;
  }

  mapping (address => ContributorData) public contributorList;

  event Whitelisted(address indexed _contributor, uint256 _allowance, uint256 _type);

  /**
   * Push contributor data to the contract before the crowdsale
   */
  function editContributors (
    address[] _contributorAddresses,
    uint256[] _contributorAllowance,
    uint256[] _contributorTypes
  ) onlyOwner public {
    // Check if input data is consistent
    require(
      _contributorAddresses.length == _contributorAllowance.length &&
      _contributorAddresses.length == _contributorTypes.length
    );

    for (uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)) {
      require(_contributorTypes[cnt] > 0 && _contributorTypes[cnt] <= 8);

      contributorList[_contributorAddresses[cnt]].allowance = _contributorAllowance[cnt];
      contributorList[_contributorAddresses[cnt]].contributorType = _contributorTypes[cnt];

      emit Whitelisted(_contributorAddresses[cnt], _contributorAllowance[cnt], _contributorTypes[cnt]);
    }
  }

  function getContributorAllowance(address _contributor) public constant returns (uint256 _allowance) {
    _allowance = contributorList[_contributor].allowance;
  }

  function getContributorBonus(address _contributor) public constant returns (uint256 _bonus) {
    if (contributorList[_contributor].contributorType == 2) {
      return 10; // bonus 10%
    }

    if (contributorList[_contributor].contributorType == 5) {
      return 4; // bonus 25%
    }

    return 0; // no bonus
  }
}

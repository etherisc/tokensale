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

  enum Distribution {canBuy, canConvertRSC, getsAirdrop}

  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    Distribution distribution;
    uint256 bonus;        // 0 == 0%, 4 == 25%, 10 == 10%
    uint256 lockupPeriod; // 0, 1 or 2 (years)
  }

  mapping (address => ContributorData) public contributorList;

  event Whitelisted(address indexed _contributor, uint256 _allowance, Distribution _distribution, uint256 _bonus, uint256 _lockupPeriod);

  /**
   * Push contributor data to the contract before the crowdsale
   */
  function editContributors (
    address[] _contributorAddresses,
    uint256[] _contributorAllowance,
    Distribution[] _distribution,
    uint256[] _bonus,
    uint256[] _lockupPeriod
  ) onlyOwner public {
    // Check if input data is consistent
    require(
      _contributorAddresses.length == _contributorAllowance.length &&
      _contributorAddresses.length == _distribution.length &&
      _contributorAddresses.length == _bonus.length &&
      _contributorAddresses.length == _lockupPeriod.length
    );

    for (uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)) {
      require(_bonus[cnt] == 0 || _bonus[cnt] == 4 || _bonus[cnt] == 10);
      require(_lockupPeriod[cnt] <= 2);

      // TODO: add plausibility
      /*
      require(_lockupPeriod == 0 ? _bonus == 0 : true);
      require(_distribution == Distribution.getsAirdrop ? _lockupPeriod == 1 || _lockupPeriod == 2 : true);
      */

      contributorList[_contributorAddresses[cnt]].allowance = _contributorAllowance[cnt];
      contributorList[_contributorAddresses[cnt]].distribution = _distribution[cnt];
      contributorList[_contributorAddresses[cnt]].bonus = _bonus[cnt];
      contributorList[_contributorAddresses[cnt]].lockupPeriod = _lockupPeriod[cnt];

      emit Whitelisted(_contributorAddresses[cnt], _contributorAllowance[cnt], _distribution[cnt], _bonus[cnt], _lockupPeriod[cnt]);
    }
  }

  function getContributorAllowance(address _contributor) public constant returns (uint256 _allowance) {
    _allowance = contributorList[_contributor].allowance;
  }

  function getContributorDistribution(address _contributor) public constant returns (Distribution _distribution) {
    _distribution = contributorList[_contributor].distribution;
  }

  function getContributorBonus(address _contributor) public constant returns (uint256 _bonus) {
    _bonus = contributorList[_contributor].bonus;
  }

  function getContributorLockupPeriod(address _contributor) public constant returns (uint256 _lockupPeriod) {
    _lockupPeriod = contributorList[_contributor].lockupPeriod;
  }



}

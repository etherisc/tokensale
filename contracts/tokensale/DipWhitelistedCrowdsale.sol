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

  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    bool airdrop;
    uint256 bonus;        // 0 == 0%, 4 == 25%, 10 == 10%
    uint256 lockupPeriod; // 0, 1 or 2 (years)
  }

  mapping (address => ContributorData) public contributorList;

  event Whitelisted(address indexed _contributor, uint256 _allowance, bool _airdrop, uint256 _bonus, uint256 _lockupPeriod);

  /**
   * Push contributor data to the contract before the crowdsale
   */
  function editContributors (
    address[] _contributorAddresses,
    uint256[] _contributorAllowance,
    bool[] _airdrop,
    uint256[] _bonus,
    uint256[] _lockupPeriod
  ) onlyOwner public {
    // Check if input data is consistent
    require(
      _contributorAddresses.length == _contributorAllowance.length &&
      _contributorAddresses.length == _airdrop.length &&
      _contributorAddresses.length == _bonus.length &&
      _contributorAddresses.length == _lockupPeriod.length
    );

    for (uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)) {
      require(_bonus[cnt] == 0 || _bonus[cnt] == 4 || _bonus[cnt] == 10);
      require(_lockupPeriod[cnt] <= 2);

      address contributor = _contributorAddresses[cnt];
      contributorList[contributor].allowance = _contributorAllowance[cnt];
      contributorList[contributor].airdrop = _airdrop[cnt];
      contributorList[contributor].bonus = _bonus[cnt];
      contributorList[contributor].lockupPeriod = _lockupPeriod[cnt];

      emit Whitelisted(
        _contributorAddresses[cnt],
        _contributorAllowance[cnt],
        _airdrop[cnt],
        _bonus[cnt],
        _lockupPeriod[cnt]
      );
    }
  }

}

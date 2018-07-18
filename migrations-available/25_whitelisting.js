
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xB9d800cf1E46EeB00cD1C15a887a2C2E049C30eb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x03dEBCd8F24722997eE1dC5B5a98B4435696b848",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49C55D26F092365af162906AD426986a6472870f",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xBB8Fb36e6Fb6E890cb3E5397494e72e032bc297E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x523CA1171fe02dA72dCC03758387cfACc2286176",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x025f020e2C1e540c3fBe3E80C23Cb192dFb65514",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x01dEeBF8236Bab18608b7028dD2011c88205bb55",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ]
];
        
        const airdrop = {
          'No airdrop': false,
          'Can get airdrop': true,
        };
        
        const bonus = {
          '0%': 0,
          '10%': 10,
          '25%': 4,
        };
        
        const lockupPeriod = {
          'No lockup': 0,
          '1 year': 1,
          '2 years': 2,
        }

        const investors = whitelist.map(investor => investor[0]);
        const allowances = whitelist.map(investor => toWei(parseFloat(investor[1]).toString()));
        const airdrops = whitelist.map(investor => airdrop[investor[2]]);
        const bonuses = whitelist.map(investor => bonus[investor[3]]);
        const lockupPeriods = whitelist.map(investor => lockupPeriod[investor[4]]);
        
        console.log('Addresses', investors);
        console.log('Allowances', allowances);
        console.log('Airdrop', airdrops);
        console.log('Bonuses', bonuses);
        console.log('Lockup periods', lockupPeriods);

        await crowdsale.editContributors(investors, allowances, airdrops, bonuses, lockupPeriods);
    });
};
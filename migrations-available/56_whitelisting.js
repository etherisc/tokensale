
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x800c443D4fC0048D2f4a83d64CDEc93a824BE745",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD7e04eBc1a4B6b24eD5BaC6709a0D3f919ae93f2",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8e1e96eC344C956fC7e0a2a15ca5afB7ae8e4FEA",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9FFd9C00a3B581ae77dFB1dc16D020306ec9f36A",
    "1 ETH",
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
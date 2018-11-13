
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x4714916A8d7CD3F7Bbd5b71039faa58e47881ECB",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa9eb9520Affc9Ab8085bb2C61186A0d50b45406e",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xfdccC6E5C635F77A97d4035Aa7Bf8053eadF9aEa",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb156E7F2734293D007B87dD1764a6C2D2248CBde",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
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
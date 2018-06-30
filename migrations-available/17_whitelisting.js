
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xFC6176c5fB4C1773dD853F079D4b5776F3B5Fb47",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8C29C31bFC87B2D4689F15Bf42D01F66f4DF2f3e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x387Db63e0c7804d08813C025B926c88Bdb857c90",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5c784C2dAc5052Cf806BF9e831e0848C887dc5a6",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x74fD854d8daad8fFF0E0960Ac77694BfA356c5b6",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb4c33477B04933c2BdDe66c76fc0E15dCab707e4",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB43eCdd3b1dAA0621E2aAe02840d6a0B81ce765b",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7e9eAde6D1E92e395CBF12919421a501ff0E7A05",
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
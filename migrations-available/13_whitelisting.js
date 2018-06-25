
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x85BE0fD2e39a2B831046EE9502D89788b29A3f47",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xd3AE1F25077A62Fe9E38f8675F0bE5B8e79e827d",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6B256de7B9E4F7e07246822c2Baf84af4C2C1320",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xfE5D6AB434227d0AC52CcB2374449AEeF509f02D",
    "13 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xDC8cd7cf5c9BF25AEdaf9c01bF3F992354f95081",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8fb7ab6491C3e6A2bBE221be3808c5d8109677B4",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8a950257cec01575931E37e9DB54Ef610E92837c",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xD0e2ddC691eA3c442668d7e801940223E95f9c41",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xdbaA6bb3893778949eD42511B8e95DAF0EA02573",
    "10 ETH",
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
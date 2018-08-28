
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x86dAe1e832A1A88A9e990670Dda03E74979a3072",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7Be682bEB239AEEc32d222e266a008C6AD961683",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xEa00b38860b0887DA68F969a9e68CA999EA356c4",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x31D04A32F22022Ec66AfE6C2351db768ed32B873",
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
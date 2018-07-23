
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x577528229Fc69Ca5e6ECa869B78B21a7df2f1baA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x58c64c0c90545F49e76e853468e4b027ec539495",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x209bd20CbA334fdb052945B9a0366B1De5bE4FF6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x18c96DA7542866F85E7e4B77E2D1cAC456a13474",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x864e7Fb99460b085726b2bF20c201FA7974BCAE3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD1622477351f56C6233d44f26FE0bC0D5AB7467c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4A494Ea6F54E66CEe8a631a46464B0823aDEA64",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x999a4ce7641e0fA0bf590A482f4486a8894162Cc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x734f44685F28Bf46BeBc8c4AB18aF49918419bf4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e2C2B1551e12272b3A00D29BCa50b4914f5066F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB9c9B055dfDE19F99Bf224cA17e20A9b5e4D144e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbC5e5F965ee8609CE840ECDf278E5B7d7A08590A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC4b14bAb750f1CBF61715D8E8b76514957770CBa",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x66f9d60F50b016e05EF315814BaB731615d0f631",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2eF89cc67dfeF7e7d1db6108A1dab6f7451E2c49",
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
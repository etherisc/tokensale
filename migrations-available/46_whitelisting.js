
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x36755A3ae86A366E2c5cCD1dD7437A3CBE9d09F6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb24A1ACFF103B079D401CCDcF5C00E9721872D2a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34d4ECD77D6378EbddA1C62A38881E4587109181",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3c69577715d6d32ba04231B96C55e73378462bF3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF51E25d8356e1cAFf0c20915A2ea73B50e1562b2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x61bd0594E0b02Ebb679F1763684CaD2c1c4F29aA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0EBC25b3b492a6DD7C8aEF9aAbB1502b8242F07",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Fdf5c0009f5ed80bBe811b39ee5bdA503034301",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDdfB8fac09C8423A01b46830f7ABa1f9228B935E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x213fe11038CCc0b1EDA3661C5D52bED224981267",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1fA0374CD277FCD50a2287628Ab52cc4E15a0bC4",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x433d7aC55Dd0662d0535ca763E67bA096e7188cc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3139b06498555b5c5E3409772315217412d6C676",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeA9A3C820b372a1B7dAe5FDb444e8f3f34ce29a5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x071b572c7D6B423973078Ae08981d944961775F4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x881B1bcEFBaf2dAa0236010CefE295a1f4Fd51eF",
    "0 ETH",
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
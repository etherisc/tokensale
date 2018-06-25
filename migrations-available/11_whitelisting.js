
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x5A6189cE8e6Ae1c86098af24103CA77D386Ae643",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60D64bA3b0928319Ca32705ecd56d8e8ACA8Fc15",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86dAe1e832A1A88A9e990670Dda03E74979a3072",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe5DD78C224F26E306c84A9B1aa2DEF30bdf15835",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45fE5a04aec2314E2E91C5888F426F55685Ca073",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5B02C1aDA0b7404a2D76B69b295f8a3eB6957A6d",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0AcD98f9b8e4Ed200D32b0a9db53e5AeD088b858",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00A839dE7922491683f547a67795204763ff8237",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A36c5bB86b1D8037576FdA54422e60823067063",
    "0 ETH",
    "Can get airdrop",
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
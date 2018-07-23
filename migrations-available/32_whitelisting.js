
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x86ed76C69E4D1f7Bb33846e0aE54971Ce3dc2559",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34b3ea53b6Ea84bC01A272d6A10E4d47521DBFea",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xba6194E151572118904CBc4cF3d5100c4Cd18bA4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe0a952554F2cf1BB172b03E4dd1A12B94eDFd707",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x23d17851EA2F1aA39Cef7849b97C3b14De0FD661",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9BebEe63A2183d4ad001E7416D44CC029bd64f24",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc4A18E41f7b8A1864cf9a15e1Eb12935Ba679364",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfc73f4c90B226251756146c9548f649F3B38ccE2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x99c80bdC044223b0F258a639cb7f8CB6137CFE68",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe46511647083a455cdDe7fA780179BAA3837b9d4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcf4732aaaa77bF6E2AAAAcb4126C8e2C1620a609",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x43Dd49EDb9983d7672D6e8FcDd49F2C71C9886bc",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x3c4538816768f7bc7A3d521153643552cC983FCA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe08B3b4DD6C8F2745fd82360C00Bc6E9b086eCf1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86C204Cc6857f820760b241686C2abd7319944c8",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8b26f7685618c07Fd58D72c929e85911E2446a07",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x75360cbe8c7cB8174B1B623a6d9aAcf952c117e3",
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
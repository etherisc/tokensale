
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x85BE0fD2e39a2B831046EE9502D89788b29A3f47",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8166AD8690A3E7BFb2D6B45006eBB5d111628a59",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa92D7E5c05796dc555fEa95176c3b79CACE2204D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x447eE09F94cac39D9cbB184819368f3B55eee4e9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56b92C22E20904B8B3158fcDD508b047f97ef6Cf",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x20e2Bd376B9657ae47704187Ea788f104F1C01c5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B256de7B9E4F7e07246822c2Baf84af4C2C1320",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1A8b46217915A6e28eFaa75dC74F6059CB737bc8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe6C58978D013B757eB315BD6fd776bEe2ee2b63c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1C33ba6696C9E8740697aC81585A90194C5e7a20",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x035d1A83B14C65d9283d85f78FeF1c3236b3D109",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDC8cd7cf5c9BF25AEdaf9c01bF3F992354f95081",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4821EcAe20050B6C28E59732931Bcc5CF1567AE5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x16171143b27094AC17dB67808e728B7Be99D9422",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48f399432b1586489EB890933476B7fE49Cd3B1D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4DD58cbecd806A8cC803A74010aCA7B707fBD141",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49b61b0B725be7eE97361318EA6711F5ccF55eD3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x404FD5C18f192e75e98356e168389Ac4C223f441",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0387DB4cc6D8C6d330425769e477355144d4EB16",
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
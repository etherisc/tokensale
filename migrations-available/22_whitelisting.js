
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x0E841dEE0AE230c0948784A2A1ae57880dE02d04",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7ecC195AE4c2a628B510758ED85D0Cf068b3aDA9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb156E7F2734293D007B87dD1764a6C2D2248CBde",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xA3E499bC8a0e9Dc14993e735744Ec071b6e12D4E",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5dD7Ce6cdcF5c6CC73BD162Bc1218eDCBAea36b5",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xA7C799C7Ca2882CcC48BDE442404f112e6DC3094",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xf24b2e415C970D768d1D689e546A9cd58Cf8115F",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x647281C9b097084d35dD9b3C98aBB58206ED206D",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5CE1336f4d714766452Da9BEDf55DeF65f2F66a1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e6CFf9f61939b18319e6E5aA02E45B5Cd9Edb94",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfa22ef75034825a82493336720E456F7aF3ad0Fa",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5ed8833357B4cC03D44D48C0d21E9Fd32B1fAE44",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28876CA4e02851947997B5529ec99D42fA5d27c8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86a14456bDb041c1ca0D6F8C0e6d4857e012902a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB201ED632810922B12A3A17F7abBd4F77C74cE5D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd359a9583175750b6e10c3C1bf15ac3aA8A9beB9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x95214B9795161D205b33407902Ff49a81bdB39fE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0039e762ECd8e8F074e93575dc395aBFCe4ef8b6",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xC1d7E36cb68B8C40Cb27C3b2460019B4A015F318",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7BC8bc547457F1a52e7547BAEecFDe77966657C0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x213fe11038CCc0b1EDA3661C5D52bED224981267",
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
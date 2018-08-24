
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x3Cd551976f59ef5F5380Db3Ce99ba5B5AfdFD9C5",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6Df24F6685a62f791bA337Bf3fF67E91F3D4BC3A",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x129631915A3Ca10B9a159A7Dc95Bde0Ba71682D3",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF9DEb6f9C15B5B7Ab3D05377E12fbAb6418EBeC8",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbe466E1e0b4eE491a88E650aA6b9aDdc38Ff6f8",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD371519E9789A5BbD84fAf18928C80aB243F48c8",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD2B721d7462ef2B67Ab73F6DFf71eaecf4946ed",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x457BA45892A65e56Cf7185d511773df0852Ee996",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe1B609382D115D355e65A0EA206290FbD6cCde06",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1CffC3dAD287cd85f0e7e396087c687AcF5dd3ef",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x140CC9A0419fe50386862202E4Fb9b2D2F9994DB",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe312b093BEAFF1C2Eb6E889B81762802E6d5a74a",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3906842E00abf96cc58300BeC49124e6A36a46DB",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x401BA6482685a73cfecd05be339Cc607dDbf9909",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x938caAE22ea8157C38233346Fee0F095116837E3",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB00fae6b6E6B5380749B6df0B0a1961fE75fc93F",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0d3650731D1f03eac33aE4cD502428BA6e867B3d",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8E192b8e5f5D878596E7f1c16828741d85F0214E",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeFAdEF57a9620c525Dbd9B12fA286B205feCe1dc",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3179002cfCd5C4F65e7A8ed5Ef27d1D1106cc673",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x32e4238dD1DfDbF131f4B77b1084664c47668530",
    "1 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00c0798C0Df1e87069417E76b8Ca4fA089D051f1",
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
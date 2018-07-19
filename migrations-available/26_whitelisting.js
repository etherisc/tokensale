
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x0C9256Cbd4e2f2BDB2a84779135793c6f2ea6afd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x891B775a08Da27995a8DEBc25c38ac08430cDE97",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4cC930A91865E30fEfF38465ace57711e3923881",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82d5AEf85fB1F6228902abe2D90E49c3aC820539",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x35dc3b24caa45619157DCe29aE37A65B7DE5D267",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFf1C08081456d375ffc637E59fbe72fe4CD7c1Be",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaECF54c8c66B5C0264dFE0b632558ab6586d4e33",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x0CA7b1340EA10FF69b9d2316aFcF21408ae6D8BD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFFF07488B95cFA9D05Ea1d15585E285E14e3ba6b",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5c2c74474D5c6F0C1540671aDe09446F04323c24",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x002848284eB655a5a99250fFbB09605B8e624261",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xBB8Fb36e6Fb6E890cb3E5397494e72e032bc297E",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xD0067548d53a0ABE8aDb440109e6250067180089",
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
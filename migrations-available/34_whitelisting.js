
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x47EDA7f8165549484fe1919453a20956b1875C44",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe51f97d886f8c0137726CC38133bCB94935B87C7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36F433DC97bF820EA44Dc89d6902c86840767217",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x460B43022DC69f8ecDd0D7cF586cEc7De42104C0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3C128564719472e27a8CbB5D90c3e41d9F9f70A5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7890339db591b78656C20D03D81FFE89B5B1b84C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41BF094B278BcFccAf6d23212ad8A6e01453b403",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7cadb9536501c76D97732dcFfD6236Ae90E75d98",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x025f020e2C1e540c3fBe3E80C23Cb192dFb65514",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5B64f12189c01dF46525fA5794F7A0075386d8c6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13E042b8350856a7E0d30DA4634cd47E4565408D",
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
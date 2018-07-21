
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x15EE64d2fd156631c2c7727C5e2D3a6f55539902",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb98F8D3e514F8069eEaeEa36Bd3f0D92DA0038b1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4fbfadF58cf32E7c616ED09D74318fe30C7071d4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1bdD8ab1954939e0Da7aF93DC06649f2a75Eba5D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54D55C8F76C1DA24ae5715922117B0636A157e76",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x17cD19694f2bB16bB44ba983808d68d71a8290c7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbC800e1416dC3cd2594404BeB6223030B6BB50B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb8558cBdCE1b54F9412097Ca257dE0955e75D92d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD7A31a19f6452C03429DAE5E513AEbcDe2a9a5e4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x01b4a98c4188aFe48c2249Aff44F79112EaEd324",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8333bD09704c9cf6d37F851Bc489B40a49CDf1Fb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x09f7ab811CcE7ed833564f21bbe8EbCE3E2Aa96f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9C060fbCf9E1A58b402315890682fBF2203e141C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA1299aa5A021802BD9c9426772aA943D66a2365B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe82a5495707c327b726E8B1427f1BEE5eDbe93Cc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x42d5f24F32fe34D94c230072fe084144675F0d53",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x695A38f6B310675f20e1A32b6902F02694180455",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73C05FA3076c2e897B231462320371Aff58515EA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaed1347481b812daDB29c6BACDc55Aa7c21134c6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a89Ef3b5a8109d2BF3415dc39fC858CEfdAbb1e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC534CAFac4405402Fdba3C253aC930F0451A9e59",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbfC1E256842c99Eed8db16294974a66F7Ab5Ea89",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2a8E9bFe797Bf1aD378562947E14F7Edc6D4499e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4ba05Cb5b7e235B3E3d28EeA57632ADe181E3E96",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13a86449686ff27A905ebB31b38E584168893Ccc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE054BC6dcb66EC778BAae1Fc05979aBe426c574e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10e26A47ef2179e3126924d6f4754C99c897d311",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x740e8D1D732306cafFd7717633e36AA49773f511",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x389Fd36aDe499b71da9FD651D092e6a167eb3cEc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x437A0741786462e66Ca0a3143407692f22f65312",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa090aC08f3C59AEe3B1222318B3dac8Ab4841433",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB85C4Bc649746192AE21E78696CEd76500221d69",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x422edB18D7E8855b06ecD0846042D2c7D5D19186",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7d000f237d74313038Fe7D0669a9B8C4f225727b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x726399aB074fF02d56E241f887224E26AeE6221F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3c69577715d6d32ba04231B96C55e73378462bF3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x78F0EC8042648e8D9dFCEBa2d972A08fe610F938",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDdfB8fac09C8423A01b46830f7ABa1f9228B935E",
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
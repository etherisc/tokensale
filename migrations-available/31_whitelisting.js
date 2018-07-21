
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x7639Db32C5b5984A6F635072a511AcC6acA6B474",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e058F35ae4814bb5F0b78CFA3fAB0b4a471A900",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe82a5495707c327b726E8B1427f1BEE5eDbe93Cc",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe281800a53B90150a4f8d330509EA210c8498bF4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA2827b4F27A42C3B6E275Db1634A786F1c2a295f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb0C9708dae79aeE27E37D0EdB8d17218c97E4Cd1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA5907B0aAd3c055961e2d53f4041AD42979633e4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x05AbcB0E92A620451A484a565A2807d28B2CF877",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9c9053A0D1587E4ebA73c6D32CcdEDFaA5a83be8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0BAB6A91ed47367a8B44e325F45E246aA47195A1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbE2B28F870336B4eAA0aCc73cE02757fcC428dC9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE8F08b2849d999A894793bEc75451fc8299AA76C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCB04F9F5E1Ac544dfFb0d479b696e7AAdb76dBFB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x339856531761745Ab0b70d1c9513c8bA904ea186",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x088212A7E6Fc50266A1344aB862653fb0C4CdD70",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x595971b2b7bA20b149C16B234E28902308544C05",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEF3E874bd07AA18A20e4896b2DFE6010c71d00De",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x462585d92d292c492BBcCD1Ef28cFE2Fadbcd773",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7F229A0ffd664804Cf3cc28AE0a9D8AA773C8321",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA4325a0e0BFEb48B02e64c054bf1e78e28EE33a9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x213DE3994517A65Ef92c7ad4EC9b824dcCCc67f5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8287ae7B97de14609DB95cEB655DE3CeE54792d5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5914aD14CC321275603F0ecDba58897Ba4f2c1c0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x12dAeA3EC72F822C6f4790Cc037775F4af64F872",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x94B7143EB689F0D1A4a19892eF019117Ef59f099",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51578d112747F6fE5715944A3E2C9Ef539d5656b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9d3E5c1678C14d89dF228495C61F3feDFDbbF771",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF36Bf474F3d4B23e67B85795c6a5Cec2AFCa4Bbb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x27B86A0a97e65e790fAae13e08542210dc2cD1e9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x93b6bFd98045C2EE83B187212a56dB72dB215F6E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x136Cf48DefAE1675856bC90CC522C678bD6b8334",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7d000f237d74313038Fe7D0669a9B8C4f225727b",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
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
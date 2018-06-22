
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x54735D8666d9e84376c910f2E32A4af79Ee48120",
    "15 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x88a8d8A13A69A182004Dfa8Dc680BEE75Df4BDA5",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x3775Ffd8a7be3D956863458f0b75D5D3030FA893",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x21F070eC7A30ca959a6f1691f270C66341d31396",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x071b572c7D6B423973078Ae08981d944961775F4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6d051308BC6de83564a146B094c890bA727d2BA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe91D97aD8EC3dbf20D15Bb4241CA37788e5b5dE7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x101c69311A889f5742C57654F06e11514fE95189",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB15dCeE154446fc0E3597Fb88Fd95F19E7c51f22",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x865D05DDe65c9F73c92ea46A36c8BAacf8Fd22D7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9a2B787b870aDA6d5923992650Fbaf886Ef7E8f1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe116c3A741E5AF84cE6c8E5B7001BD35Ac76481a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x16Ec346eA64c6259B9cF581fa87324e3772250d7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x881B1bcEFBaf2dAa0236010CefE295a1f4Fd51eF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6Df24F6685a62f791bA337Bf3fF67E91F3D4BC3A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAd21D247510a0c744342aC7699bC44660d00a958",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3796603558635c8a12552Aa0d872b3e6F12Ee8dA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e7B8e5eB92452926c88681CC55DBd983eb17D49",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c16326f6D426431DFc61BA273925D93b29D474C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x281F2b769534b0955F939307c128896c7C4D2953",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC9e331CD45786684DCE17720a46213751A8AB0Bc",
    "5 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x88573D1E18757d4B278758f5416e6B76De0dc7A4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x392091c24476B819B9F9B0AC836e519cc8b16920",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB950842E85C05c55FAD3fF3B127D735D5333AA4d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Eb5Ca7Be0C61C2B6f5c744Dd1899fF4aD8bc768",
    "36 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9C3E6c3bd9f0A2B845b8f362bDf7Ed6AEF2928d8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB4f43f147c95FFC3eAD08a4BC6C4C5c9329b668c",
    "10 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x424798d74557A4Be6Fa1B7CD3344093DF10bb075",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x64b1bc7745e419c98593275b20B5182e5233523c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86Ec28800ce27DD2824B1dbF7E8b9984C9268337",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0d959693226D9f9C2aFA12B1Ab014a6CCD0ef88A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Ddc4233A7D79c7c492db36f5Eb32579DD97e03e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x090ABBFa4A0cd49602596162E411D740ea595Af6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x308258650D3a2E67Bcc66562405B6b3E1f174fe9",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x88985316547625E1C1B80f0850803296ecf5e87D",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6111e1c0ccA00a10929B6A4Bcc215F941A51968B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBB468E18a9BF5A3a1aAfeE6118E698920606C5fE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf24b2e415C970D768d1D689e546A9cd58Cf8115F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEEfF525046d07FF5693616D28eCbC14c6586fDDA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa0873eAe6618136f9d77A94a0990455B97778EC7",
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
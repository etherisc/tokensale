
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x312Ba6FdeCea1A49b4Aa37ef8b81984Ff69D8BD8",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5A6189cE8e6Ae1c86098af24103CA77D386Ae643",
    "150 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xE2E5f8e18dD933aFbD61d81Fd188fB2637A2DaB6",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x737c5cBb00Fd6E6195744ee3b98b152d955A6c6F",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4DBcE1388e08daB37535bEcfd1F3b28682FF42bd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2069d9F61b8b19C539188382FEE55cc6e64201bd",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x67b350E22CE738d26cc32643BB201020f2A2444A",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xF48e9DC747EEaDA9afe96221590C94073c39fe05",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9f8be4c44396F8C8922050Ef6F1B28f387cDAbEb",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xa34f16c747E7eb21a32C28bDe173c2fB099C70A1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3B17da733787493d4E13ecb18AfC7DC6ce031026",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9a7b5AC6002cbaA2F4278159b1c2F6fC120a5F6c",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb6AffC9a655Cb074a1d544dc906FdF4811C4d795",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xd3AE1F25077A62Fe9E38f8675F0bE5B8e79e827d",
    "0 ETH",
    "Can get airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x372Cc010C6677434739398463c6BC11e995EBf26",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5Ba4bf51B0b32793f0439162c32116ed1FDe51f0",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x778D849C9Ba698314935a1836c455BB7bc28B3d5",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6A5B07c29b46B9AeB64c7612732Ad8839264be85",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x70e9167776061C563acca07A92d25DA22f6dc275",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9f54bCcdDEbCB5Ab396a67d16C50ee9647D15139",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8016C45b2C3f08a8100B2839b4263222cCCf391F",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x02B322ECFD80Aa1dE6536Be93a496820a84711eD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82363319ea1852582aFeeCA0C5d1E6370Cbb8cA8",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x85BE0fD2e39a2B831046EE9502D89788b29A3f47",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x202c29dD21420c6b6d42ADfA55B19c3e8aE28774",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7C022500136e33F6c7649c3677DE5D71dfbB9eaC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x092416b09E32967BC85988138f0993DA8D8b4A61",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x449F0e055cCf263A7410479704e7A5a47aC479e8",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x56D550B73072A51261F53D44E1331d7C7DEb0E52",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6927F6Ae8413c602c4A943E5f228D8E92B1d97E9",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xddf43C5Dc408CED169569c1E9Df933E5F3e51215",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7dBB8145145175509c32294D7AC01Ef0D8c4fdf1",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8B91C0Dd24C4Fd4F973e49ED8568921e31CF38b7",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x000B40251A19DC2374ce870e67635B4185e0fE28",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7611C0D7a7aAe9EE532c4FDB4E9fe9fF8E91D4Eb",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7098DA7DDe0B85BAa6517D732D16fb06D8bBe022",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x546a0cB802377153B4fEAe052a5ed14C98B3CC9C",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x88a8d8A13A69A182004Dfa8Dc680BEE75Df4BDA5",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x0024df2bE7524b132Ced68Ca2906eD1D9CdAbDA4",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x630698F9d679F232ebB044703163BD7C40663d0C",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x89eCCEEc77B11172382d452217E9ef635c013275",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8832f9860319194e02d3F20fB50B257c87F3C992",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44f5E9DA896dD27c8294D7570E2D08bE402D438a",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xBd18Bd895FE4A9f9751577F6a8Cbd15Fb5367E21",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1fA0374CD277FCD50a2287628Ab52cc4E15a0bC4",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xC9e331CD45786684DCE17720a46213751A8AB0Bc",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2Eb5Ca7Be0C61C2B6f5c744Dd1899fF4aD8bc768",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB4f43f147c95FFC3eAD08a4BC6C4C5c9329b668c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x308258650D3a2E67Bcc66562405B6b3E1f174fe9",
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
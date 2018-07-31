
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x101c69311A889f5742C57654F06e11514fE95189",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBbe548cd057996E2873dAC31A3FF9001cd343FDe",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6A552FeF6c7E149dfc093aE0DA582888b842Da76",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc7C791962cF0C7a024f07e0f51dAE3c831ee9Ab7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45E5d313030Be8E40FCeB8f03d55300DA6a8799e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x95214B9795161D205b33407902Ff49a81bdB39fE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc5c029465b5f674eaa9100ddCe2B368f11F74eB5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36B70790eDa400A74363D576090209CFfD5a01FA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD8c66F4d06891a21600F11c01e7Ab42912029805",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfC87aaf00109738E0254B0e41734689fAcd9927e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5b609868f4d98929A43A2c74B96BEB48F4d611a3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB16BD558262637055C54787558fE8669694807fA",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x29f0DEF7585320cFC0B0D26e631c3C4e0898A39E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c153FEAE296Dd6F0249323Cf597724a9EbFfF33",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x69Bf89C1Ea8378Fd309765d04ED92c81b3b00934",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2E91F7e44eeE5502FFF4A30F04fDAc55c4BdCe72",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF5E080c4c118E55D2a8dBDd35ae0F51A387b3A25",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7c65EF40B6A9a126951a17eb84fEF0Ff99D54DE2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x88573D1E18757d4B278758f5416e6B76De0dc7A4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Ba4bf51B0b32793f0439162c32116ed1FDe51f0",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x27cEEc2bc71BA4E45DA31Aa48F9d25D113DB3cD5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6F72D9D38C670ba5176542E12e8699c4BeF2a722",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28035675446Ce74317C3BD357e74A400e1Db0118",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60a4e810F4b293206A299f980D9CDd323DEdf228",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdf5ea78135845702003e8e5612d74bc094D225a1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3955e672f3306fd39545edB3d7040cf8De2f9180",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x492994197F491D89cCDEBD60Da2c972113bD48b6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA8dA89A88a96E642b8b6b00Cc122EE6045fA9689",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4eA0878C6D1B4Bd9693D53650F160bDAF33f2B3e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73d7a3957d42e21b90aFa344477840175e5bce5e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41938e701C1c8ddE1Ff68aAE6484165adDDD6C98",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f8be4c44396F8C8922050Ef6F1B28f387cDAbEb",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xDe5B03cff7b5af0f62594A1E4Dede1499BFcB674",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7eb3dbc59D464e1000FC69079df6e7a6f91dF752",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDC8cd7cf5c9BF25AEdaf9c01bF3F992354f95081",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x185D33C0376E25D1b820932cc857D7191DfE3753",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34aeeb80F86d1Af9b99DB938E0669cCDfd3C56fc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa6B16783152978A88efd9c4f51355978341D131C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6799Ca07abA8180Eda4000C027753537D78f8430",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x67b350E22CE738d26cc32643BB201020f2A2444A",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x401BA6482685a73cfecd05be339Cc607dDbf9909",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9a7b5AC6002cbaA2F4278159b1c2F6fC120a5F6c",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6127Dcaed679eD2aFCbd9c88a97B77A91eD8Cd99",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfB8B8038eAccF6c8A0780478406Fd9CB8F3592be",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4936d59F7F33585606A763c02307c4f78E7362fb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x92afbF52D5Bdc48Ae2b3bC2E50Fa8938d2385281",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdEB49B1cf2D98283153D3f0aAC98de66B863c6DE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE8aDA351BCEFCb4474d8930B3Ed982Dfc661A192",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbAE8326576aA97a79FAeD036f434a94B4d8CC0f5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcE72aB91E8951bF1153F20F1D2dB9eaBF0De684B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa7D8cc7dFcdC28F7c92d1140535D4B4648Dde186",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6320c2B05a8327E20E0890a1D73d041B834a0685",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8fb7ab6491C3e6A2bBE221be3808c5d8109677B4",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x810171f01B8a9BF1d943dbe17aA8D94ccd5774f7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f54bCcdDEbCB5Ab396a67d16C50ee9647D15139",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7dCa277D5d3FfF7C522Db08a7926246fb3A103bA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddf43C5Dc408CED169569c1E9Df933E5F3e51215",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x18E4F2F98142617b851AB78359254AcCb0c5b901",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x429738B49342890E30B8cEE8AEA620570aBBB3B5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x158964CF45c9C56Ab57e4a7Be19F023D6D3f9b32",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x70216Dad1da9824aa0dE60Bb8c18A81150150C47",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x68257Cb26cD98cC7E0d89f7b00986C844958B664",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDdA2dD3BCa56eA616111C0F6B8aeB5a7b6845D82",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x97AD9D9E2f7b58A0D8B5DAb4f7BCc6A47cDcA387",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb63bB26B5F1BC02a0382404dFaD129BeC7d285f7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1A8b46217915A6e28eFaa75dC74F6059CB737bc8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x37290906100Acc70Fe480F136cC43026bd204028",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x273442E8123831F2e2BAf56d8FA7d5Cc9c97930d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8dDDde2F6094ce6b365eb186AAaFE22af3b137F5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0E841dEE0AE230c0948784A2A1ae57880dE02d04",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6326f0C772E6C7F5Fe687692F9e969a90b51059f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0094CFbA72eFCAfe4d45C257a713414B9502a348",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x632aa3b390358BbF0051FEC464497b64CC399217",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3fa821E3cFB7AF05aFd94fe13cDE71f28d0F310c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5536631e9954e9F18EDE829F9504CCFeb89496ad",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x965B4d92300F5d6205362913A3f960fBC4242F9c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE1aC706fC0258A05A776119A2794309cd6090dC5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1c8abF3790eE489b75e653e1cED91EBEdC52Feae",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbaA6bb3893778949eD42511B8e95DAF0EA02573",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7dEc36b1EB0726C31e83EE37074c278b2a867BD4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x189459dD8D2A368c27d23Be3461Ada11E3660b58",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5fA5671beeB3f999Aed80fc9334281FBEFbA40d5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4d712EaD95735917e46Dd9FcD1e56909f990d065",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xabbFeFE98940291E7BD6966E43d8454bb06D0816",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB3B34C9Bf2a7E4064eb6AD7bDAad9b079642883f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a4b5e3f1E1a45Ba826D2208d20E835BE2C2CBfC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe8Da3052ca4e595b0D147aCCb1Ef9bad3cdfeA54",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xA54EC33E564F1a90cE8bCd335E70591C88d5eE21",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x156bb1a14f21Cc34b3920D7C0C948A350C8F7fE7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfF66892200fAB1704Fbc292303f0500d911dED95",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9688e30E7A78A7fb2Ec28ec492194120BeEd5942",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x59c4700d7f3716F949b5e2aF1cA0F28103E82a0F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45521E354B374B534292005f71E776e5202CfdAa",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x357a139698a359eA3c4746A3B952273AFAc1006D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x89bf7C96BE394d3bd7ef216072343557DD93EA2C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBf469B493F33550c05cC418815A42f8142996f52",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B256de7B9E4F7e07246822c2Baf84af4C2C1320",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe71A8585E007e73E0FCA225512f229856053d1F9",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1d597B87f8aDF5d1944A7df6254dFE97010c3199",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xED69185f96d064F167EBE85EF9374559ae2D1B16",
    "0 ETH",
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
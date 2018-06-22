
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xc7C791962cF0C7a024f07e0f51dAE3c831ee9Ab7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x202c29dD21420c6b6d42ADfA55B19c3e8aE28774",
    "29 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x000B40251A19DC2374ce870e67635B4185e0fE28",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x086E1E89A9fDBF67541E63E0118c040C8866c843",
    "2000 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x13F7b439246bd0865532DF51880751A12832d4bd",
    "1000 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x092416b09E32967BC85988138f0993DA8D8b4A61",
    "5 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x67b350E22CE738d26cc32643BB201020f2A2444A",
    "8 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x51f6427d4995deFfE460787DE16439c1262AB255",
    "500 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe8Da3052ca4e595b0D147aCCb1Ef9bad3cdfeA54",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x26B2cF9966b1B175B0506C3e25Ac76960aCf52cf",
    "200 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe1ca89DA2054EFAF27bfeE5DA59E3d2645AF7FD6",
    "200 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x83EBf9dA1B9C31eD6317E6f6E38a5cE59EFFad7c",
    "200 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7C022500136e33F6c7649c3677DE5D71dfbB9eaC",
    "40 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdE193b1493bb1724a621678035E47A119f5D1637",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x0024df2bE7524b132Ced68Ca2906eD1D9CdAbDA4",
    "40 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8B91C0Dd24C4Fd4F973e49ED8568921e31CF38b7",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x3b38DF411221126688b7CA4Cd3B5C08144E558E5",
    "145 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3B17da733787493d4E13ecb18AfC7DC6ce031026",
    "11 ETH",
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
    "0x546a0cB802377153B4fEAe052a5ed14C98B3CC9C",
    "2 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7611C0D7a7aAe9EE532c4FDB4E9fe9fF8E91D4Eb",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xD0e2ddC691eA3c442668d7e801940223E95f9c41",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x938caAE22ea8157C38233346Fee0F095116837E3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD5DeD470b9e0b65db7018Ba463D702Ca59adb989",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0ee1Bd3BafB0a7B01dF1d3572AFc882cfba4A718",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xE861d66727DB7C3920D3F809D0106E19B45f99D3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB635FA1A4E7F1f2edf5fBe4630040cb6db0B40af",
    "500 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB16BD558262637055C54787558fE8669694807fA",
    "12 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8016C45b2C3f08a8100B2839b4263222cCCf391F",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7dBB8145145175509c32294D7AC01Ef0D8c4fdf1",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xC0D1ADa5B5f7b6b42ABD00883EefC933D20191A7",
    "15 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xbAE8326576aA97a79FAeD036f434a94B4d8CC0f5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x737c5cBb00Fd6E6195744ee3b98b152d955A6c6F",
    "35 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb71D05cF5CdF7a9B15B20b9aaB5E91332C271c96",
    "10 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDc9410dEf289E92Cc9Dc13d1ee51d2bF820E0B3E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4784EC0eE6a87b39183c4342E8234c1a1D5B2173",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCc2aF63b39a0817f7fd93Ab604873FF0C63577d0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x87E80Eda1d03c895e4C6dAAfB7A19f755c64D9F8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8fb7ab6491C3e6A2bBE221be3808c5d8109677B4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x049808d5EAA90a2665b9703d2246DDed34F1EB73",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x53c848621bCb795aAdc7884c52F5aDB41E426C7F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBc7b9FC2CB2d00fDE719E67b35b323ce97c9135b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7098DA7DDe0B85BAa6517D732D16fb06D8bBe022",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xd8b2B7F42873F111348c835563e26865474337db",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49E3Ecea346677CeBbB0eb007ABd1006D843CeEc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x941579a1e5A62Ecb5EBD8aCf3b888fE83bfB71f6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf102f0471A8Ac15fF31d55E06bD365a4f5c59063",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8c9dF016F0CcCC6523bc8742F3896bF103143034",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3Cd551976f59ef5F5380Db3Ce99ba5B5AfdFD9C5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x06ecbCd51e93CC19f6ab8b90BAADd70B43bd5797",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x673B96423D16Cb948cc235367727b39463feB9E6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3906842E00abf96cc58300BeC49124e6A36a46DB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD7669CB6bcEc3a9e9Cd2Beb38074ECd267806c47",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x92afbF52D5Bdc48Ae2b3bC2E50Fa8938d2385281",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb22854dF41D8F2B3F5d396A75207C23B51Ee9De0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28bbf0ef519F72CAFEA000eaf64ED679dbdda738",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x871b234fC63523D45def3b8F1753C2cF7975e830",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36431e41Ee5570329B998E37C1901eF4EF0Bf120",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6927F6Ae8413c602c4A943E5f228D8E92B1d97E9",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4EaDA5fFad5A86A295549Da26F78263074a66796",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x18E4F2F98142617b851AB78359254AcCb0c5b901",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x37333D8F083cBA8f9278825032A8D3214bCC5b5C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc037961423079DDD98B99BE89a49775413BE2011",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe7BFc2D67D621812FBccefBB56afa1d258cA9748",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDe5B03cff7b5af0f62594A1E4Dede1499BFcB674",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBEB1FD865fEEa5006c74Bcb615Ebb00F1a05d469",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5CFde147Ce347f362b4c26Ef489c90a73897907A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7c65EF40B6A9a126951a17eb84fEF0Ff99D54DE2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa7D8cc7dFcdC28F7c92d1140535D4B4648Dde186",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x940111c068d63a12E3D145453856401c0d1c5644",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x70FbA1b46B513EB32bc9C5Af243cCAef8Ce73C64",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7eb3dbc59D464e1000FC69079df6e7a6f91dF752",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc148a86FAECC3b3F03656FCe61c21B6b934DD8c7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7A5Dd9BAbCBa6Ef012c80E0d3F51207953e8E845",
    "60 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBd5629FB3a825f4E1CD53077979AbBB147ED3898",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x69A93C35122c14B099377dC587E0505138A373eF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0FB123E29f3088133DD0e3dB7D28ce11e843A9bc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x787b4b7FFEf8edDaD54F311039aCF4c36FEC9593",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1a415486734edfA80c912c702053B229eD8DF72a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x554e14a43Cf59D7CD5F3d5dd6e7C8fEc84F62834",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3955e672f3306fd39545edB3d7040cf8De2f9180",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41938e701C1c8ddE1Ff68aAE6484165adDDD6C98",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3550d46C8535E9311f106f4820De4B9d7dE66bFd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5199479a97cCA46E88D6a6fAE6484a9ebFf82828",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22a05f2Ec93E25066c5683af4144e5DDb7c621b8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x907cB6b010092813439Fe52ba50c24fa1765F3eC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x59c4700d7f3716F949b5e2aF1cA0F28103E82a0F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfF66892200fAB1704Fbc292303f0500d911dED95",
    "1000 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x083bF340594B1a0d88578AD21eb913D1232B881B",
    "1200 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6036a68fFC7A331a1f3B4112a2A556A54839C152",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A55981f98d823fEF9E7CC2F56F8f771E6d9332f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x340BC157038d4F8e417EA96d9D346Bb30E469faB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x04035F558b0A5dD652a1bdc379cCAf00c4F62647",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBe7e56D39820bB67361638F02dc71c76dA99153B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2c85c8d5f504199a27384C271530e978F35C47ce",
    "15 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x19527a176a9634ef8b83e25bC0FDD90533E0A966",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddf43C5Dc408CED169569c1E9Df933E5F3e51215",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x372Cc010C6677434739398463c6BC11e995EBf26",
    "12 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x56D550B73072A51261F53D44E1331d7C7DEb0E52",
    "15 ETH",
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
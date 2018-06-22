
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x73d7a3957d42e21b90aFa344477840175e5bce5e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbf9ebc6082d62194F3Cf99A303Da134587e900D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x748eB8DB6762EE80624Ab083BAe059641f0517A7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6320c2B05a8327E20E0890a1D73d041B834a0685",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41404557B269F728287cD0FEC91622eA3525209D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8F3F437d124Aed4dE93641EE331ed1C422eD22F3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9a2F0fAdAacd579234692bb5311c7D9960bcF1E2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5fA5671beeB3f999Aed80fc9334281FBEFbA40d5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x643FfE1C01fBFa9877C3b59cFe66Ae41412907B5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x65755c9Cd95c84731fea609021eCBbe410753719",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf256E5a7Dc244FB34269160103392680825a3956",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB2FB5AEFF173265ec147E126134D277f280E96fE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfB8B8038eAccF6c8A0780478406Fd9CB8F3592be",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0EB01Cc718710CC94c6028295C5C68aBEa58DD19",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x59fCdd1e59C3e6CaEc00b282930aafC52C84067C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdD3E49C138D4cd1B016C83BdE71c3689c4331CEE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9cCf419b3E70a18160Dc1A98870430937AEa72A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc14b5b01cce05cb1a938CD32C9777bdf74D7Da5b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x07bA040A16D96045173369AE220a2C63cCD8905d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x90AAB51a7f859E9D6534D5fA7BeCF217039FbF3D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5c5cA29a2200c9bc2Bd4C4C51a0C546Fd09F4BD4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaDdAe8f7b537911EA5449235d48FC74A83E3B3b2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA54EC33E564F1a90cE8bCd335E70591C88d5eE21",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB6cA262290B14449bcCf5E7CCcd21D106AA7622A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcF64eEE704597156D0f39Db7c478331484cD6966",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x92BdCF88b8cACcD670dD85Ca23ba68379D6355f4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa0e28B7AA4e3a405eB4DEb47df75421ccC4aB32B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF48e9DC747EEaDA9afe96221590C94073c39fe05",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e30a44611c438FF20f25eDA5317e2A4729Ffb13",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF9DEb6f9C15B5B7Ab3D05377E12fbAb6418EBeC8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6EC1C4da1C8d390081177B3c6286f195a25De34",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6eb91d2bB1e4ce166621F0de95474868e75653a2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x387Db63e0c7804d08813C025B926c88Bdb857c90",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e97272B0f5a4116535c207A6eE13d7858044D79",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Bf9e7017f9c71Ec64a17f3a9d9a79Db7Da911B3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x189459dD8D2A368c27d23Be3461Ada11E3660b58",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6Ffe7d8621fCB1a1e00e31D94D161e32d40E3D24",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE2E5f8e18dD933aFbD61d81Fd188fB2637A2DaB6",
    "22 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x449F0e055cCf263A7410479704e7A5a47aC479e8",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8eefab29695467A9500C57C92abF39FbEE4c9D93",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2069d9F61b8b19C539188382FEE55cc6e64201bd",
    "16 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4DBcE1388e08daB37535bEcfd1F3b28682FF42bd",
    "10 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5377a47b4fcab62d2AEB699096f831684D227Cc2",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9eb0b7D74bD5739648726Fc15C81DE1cBc9b0800",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6A5B07c29b46B9AeB64c7612732Ad8839264be85",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x51Dc5d339D628DDD1Bf7729bAcBB24B03a61Ad1B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x94b5B77e7cEd2AB7D6eff1D7AF04db0a4e2C6DDf",
    "200 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD3FEe15681c13Df141e3E9F7F83213E73646026c",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6378a11D808Dde4924B95A9777723c931CF1319C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xED69185f96d064F167EBE85EF9374559ae2D1B16",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD2B721d7462ef2B67Ab73F6DFf71eaecf4946ed",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8d11Da7b584C9901Cf8Dd401e4B34e73a0520585",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaC5916e083a6CD940d1FAF70f23373663D66D81d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6c3f2c7180c6B0bfb49405D6B67411100E9976C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc5c029465b5f674eaa9100ddCe2B368f11F74eB5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34a77C221Dee2464290a5A5E03b1F21dA6Ef2ceC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f6Bee6899CCD70CF776107CA787cD88dccA0b37",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x90821538FcD66a354E1aca9e899c9eAe8E749E1F",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x17a985dBC716F06E99c6C3fA38f452C21C8835F0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd930386E5Fc0F5274bCBb96117b2CA926DaaAa88",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x005B84174E22C679a7707828f19E44a4dBe73d29",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcEB28B5011266472a32600cD92270942062baF8e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa1bC11f8fD045a64f934512377AFba2f7bea8C07",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc5C84D08f5C818B067E0981AB3Fd81F7973C98b9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3fa821E3cFB7AF05aFd94fe13cDE71f28d0F310c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x80A89FC32d03031aacB58e11f88637373F2627d2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22bcCc1001BC6b8F5D0F0148B34ef7eB1342cABd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x312Ba6FdeCea1A49b4Aa37ef8b81984Ff69D8BD8",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xbeA029839dbf9b7772B541befA2d5d006812F3fE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2352cB0D5f986d4d33eC27C076f9A4ADa13E7e3c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36B70790eDa400A74363D576090209CFfD5a01FA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5CC9ECDFFb501cf5A806868e6f042f9d4F6C6103",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddb52Cf39a7E3Fdaa0AFfEC4D35EfF4E54Bfd780",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBbe548cd057996E2873dAC31A3FF9001cd343FDe",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45E5d313030Be8E40FCeB8f03d55300DA6a8799e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4d712EaD95735917e46Dd9FcD1e56909f990d065",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11cfCdcF47Afc12a9DEA49e96b55E66C00f384ac",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1E6d8be98d672939D2Ef991b69d320c84F8FE841",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Ba4bf51B0b32793f0439162c32116ed1FDe51f0",
    "1 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8EF3D577898623d8f6DcD40d21264ae9C9B58AB9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a4b5e3f1E1a45Ba826D2208d20E835BE2C2CBfC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x08a7280e58FD7d1814C3A6DE42d8859e8dc134C2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x95b8ec94C7503b1Ec77317a4a26234CE805Bc116",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x98eDC90E6d0C72F409c0C6Ab0F3237E888AE858D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcE72aB91E8951bF1153F20F1D2dB9eaBF0De684B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9FFd9C00a3B581ae77dFB1dc16D020306ec9f36A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x84314Abed819BCaA29530dfb50cE36bA6B6d1B39",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1A8f085e817C4a89F443cB6aB05bEDBbf240694D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28035675446Ce74317C3BD357e74A400e1Db0118",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x57F7f85C151A8A96CC20fEa6a43622334C335fe4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaC08cdBd8adF34f1BF8809245A23eF669023a7B0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9688e30E7A78A7fb2Ec28ec492194120BeEd5942",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC28993B1d5F80b1dDCbc8e83Ec8C8765e6A8CF4a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbc0e18F5406ae477C54e4776Ff51f3de0a67A1b7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x395512FEdd1B2236B03533C2b46EF0cE89a9aA7A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEdF72EC4134a483Affbc73bE081EF4b64dEF646E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56768c4d3862a6b0b90d6b5191795acCE13f1d28",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6C9B0dC29109ED37F25332B3b68A213657d8ded0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCc426402362B6B2B0bdE6791025C188c09f04d31",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF5E080c4c118E55D2a8dBDd35ae0F51A387b3A25",
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

const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x0FF96d29D25E31C4ac2A3Ab46bA1a27B0b3A9C5f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7611C0D7a7aAe9EE532c4FDB4E9fe9fF8E91D4Eb",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x57F7f85C151A8A96CC20fEa6a43622334C335fe4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11e83475444B03c08fa91d67cb6D1749b6A63f87",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB208C7B6f19d393559d4bc7e3e2ef225285Bd93B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x24eefFBe8a04063Cab00913c251dE830a37346b7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD22a3962A067472b335CF2564365C3034Bc975B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF619C7B3Bc1c94f96979eBb2503628Ecc6ecefE4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8961ce440FE7A401fC1edA5e641E2020D12BA167",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0F9fa7E4DaF995F3630f3eFfBbDcFdAE61f5293c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeAd9d9105965C4026794D876820c5cb6d52163e9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1ee5D7C2319b54aCfc44F98480C4807C5605B7C3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x185525f1C6964E608be271335bF136C0e69b52E4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x787b4b7FFEf8edDaD54F311039aCF4c36FEC9593",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb334F5E890C0a4211777A876562E33c915230C9a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3815EFC4823479D9C72982A1F2E9b160320C8544",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x95b8ec94C7503b1Ec77317a4a26234CE805Bc116",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7BC8bc547457F1a52e7547BAEecFDe77966657C0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5199479a97cCA46E88D6a6fAE6484a9ebFf82828",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0067548d53a0ABE8aDb440109e6250067180089",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7098DA7DDe0B85BAa6517D732D16fb06D8bBe022",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9a2F0fAdAacd579234692bb5311c7D9960bcF1E2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA41BDA27329d058792d33566316A882E1beB88A6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB7A883569c1D1AafffdBDAb06fE9616CE738a227",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBB468E18a9BF5A3a1aAfeE6118E698920606C5fE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfBf7DC0756a9768D0C71aea5f8421F3b1eaee7d1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC9e331CD45786684DCE17720a46213751A8AB0Bc",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x92F1FB38F1B67a4ffa0A1b4c2C1fEF432c177A7C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25f37aFDDf08Df40C636dB75A8A93976a31EBAfE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF8F1F6846b856FDe3210061d2bbC8EF43E356e7F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2A1adB594b687FBA4A24040B0a3eeAa4C94f9927",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34eBDECF005659aadc2e4eb3d4cd1e9DDA75922e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4Bba19BA821c37b29C586d071acFC1728e1614A8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x308258650D3a2E67Bcc66562405B6b3E1f174fe9",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x53b581613fb6a359943bd0644Ee3D0BC053fbC77",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00AF0Aa8e138Ef7741000072aF92867B63668FbC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFd03e76aFA140F442a1B3eaF7b9Af1461f61b59C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8832f9860319194e02d3F20fB50B257c87F3C992",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x43e0c17a2ABBED4F041c968c778462D29D11226d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa032ED132e504Fea4fe73476915f28b51908eaa8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x504C2ba98C6C17D526Ebe073218910f7f27EE51e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcEB28B5011266472a32600cD92270942062baF8e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x741f1A0bee55E541C985D9183d656aFdEF2BC3a9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0d959693226D9f9C2aFA12B1Ab014a6CCD0ef88A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x035483926d143B394Eb9fc8B974b44EBF338dFC7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0b9210782963cc70466c6E5B7F9e210FFb996e5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1CffC3dAD287cd85f0e7e396087c687AcF5dd3ef",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8E763c3c5361777fC3Ec5F377e9BEa26CBc65366",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60256530d074465406Df460B6f38424ab5dF6BED",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB6F84c4ad41c44053ce231Ae42106DE20b6dEeb8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x85BE0fD2e39a2B831046EE9502D89788b29A3f47",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x3213ED0eaCC8dD28A5DE45031F25A83D8FA7D361",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdb1c54F7c3D367FE2Ef964C99e2fD2F322b288aC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x562E5C553A3DB3d725affC3AffA8EbF4014cE1AD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb2abeE613475fa803206Ffac9B90c663D760ca4E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x468d453608A75ebca3da923d8453c240Afb6B7e1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7059De4E0c27a2087F849Df21a8636Cc44faC9d7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0CA7b1340EA10FF69b9d2316aFcF21408ae6D8BD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x98eDC90E6d0C72F409c0C6Ab0F3237E888AE858D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3179002cfCd5C4F65e7A8ed5Ef27d1D1106cc673",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf37a5DfC8E3c2c46e57a23f6Fc0DE6d1F8845120",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22d156f4fDAe315957Bc955510E3918241caF571",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B2258d4cE92eFBa982D5C2ff54f15ff0CF3AF30",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32e4238dD1DfDbF131f4B77b1084664c47668530",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x573aCcFD838Ca460AbfaA95738f5196a0ba5Eb40",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3ddFAC5f3D920Df8952c891C64Cd1C4a8dD3F2aF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2a9Bf13Ac4F6c0B7Aa2eCA253c4ecd449cBf3c4D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x02B322ECFD80Aa1dE6536Be93a496820a84711eD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x875BC71AdF52c48b25E8950C947179846A13aE43",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x216e530ffc9A1aF3fA6E7b14244C2f41104D1CEF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC19e05Ef609CA3B59523E00bB33dE3e8c607cbE5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x457a9a9F515B3096c136D839B8d809b5b0Ce86d1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x30D548Dc9F4a9d53d25859430C2FdF32b15efCF3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaa5343DeDB35EF3dCffE93CD034169194AAf20F1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF539a4503D28548505115Dc3653AeA3B2dEfDac2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE0D49f2cB863AC77B1515f409B95449a4F8456F9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfB8B3D001783385a098C334faE740b61AD42460e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd37331D75Ac2188170a36037F7fA671a7111bE06",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa5365d2a7d7CC531b2e705f32c5bfDc247dA7400",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6111e1c0ccA00a10929B6A4Bcc215F941A51968B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9F9f62b3cf6BD149bb8aEd70A123745621EF9b26",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x42cB2622ce5790464006d2Cb1cE2E325c3ab7486",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x88985316547625E1C1B80f0850803296ecf5e87D",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x76A010da4799ef1446A5df29A3905c123f654F6E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c16326f6D426431DFc61BA273925D93b29D474C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48f399432b1586489EB890933476B7fE49Cd3B1D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x241f6840DaaD2a2B6A7fA9948be5C289af668A49",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1a595C7aDB8F5b5526d3646d1C158e99b734d2e8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x800c443D4fC0048D2f4a83d64CDEc93a824BE745",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x75fbf90238595c486Cb8186553134DB074b4E34F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0531d6115134cA7e2DDCf256CeC6e6216D7fd8f2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB018AC68Ae2979650F8482D1F92B12D4Ad268948",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC06b4DF9a912D885A3d22ceAd70a4089A86FC310",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD8a56E5d2d0Ef5904acFF63Ab307cBcF4C4846E4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73Ef86Ea7f3E372BA000ff4e24899b0D5963e821",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x998ddfC4Ce8cB19B13050316d5bCe7d31a584460",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9C745752996De57aEdCAB295F329242B8324A15f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f6Bee6899CCD70CF776107CA787cD88dccA0b37",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE629471c869b257bbCFB87E9aB1Dec8D33255fA1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa6a777ed720746FBE7b6b908584CD3D533d307D3",
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
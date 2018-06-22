
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xC4aD7F7bF5E6C0A7aa91717510942898bCe5eb3b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3179002cfCd5C4F65e7A8ed5Ef27d1D1106cc673",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44fCBC53D0fa5D0B0Fb7C03056348f8582B3Ef8E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF539a4503D28548505115Dc3653AeA3B2dEfDac2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA7C799C7Ca2882CcC48BDE442404f112e6DC3094",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF6D319cb651E613ea343E078C7eEB228f3ab146d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd41A22960df84074B7D7bfDA3FE38975A30a7F95",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x53b581613fb6a359943bd0644Ee3D0BC053fbC77",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAa747b5402200B4cb3161b4DB6B98Ee16F962899",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4a25BE1a6cF5c6d9aBE9271Fe67366c8f5be15E8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x911A40527CDEDBbDCbC5C2b117A3B71Ab9378997",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7276846B1DC5b8Ed675122eDa1679d5D17904cd6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC19e05Ef609CA3B59523E00bB33dE3e8c607cbE5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e06Ec39468535a791cE18B8eE1Ca74636B67F19",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFbA65C729F879F319EE4eC6fa172aA728042cB35",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86dAe1e832A1A88A9e990670Dda03E74979a3072",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x371C98fB569e574951FD3a6a74171Cbb6665d6f4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE629471c869b257bbCFB87E9aB1Dec8D33255fA1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3b18a5fC640973b32b4668685dCaE182D051224f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6326f0C772E6C7F5Fe687692F9e969a90b51059f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2a9Bf13Ac4F6c0B7Aa2eCA253c4ecd449cBf3c4D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x007E48A5e307fcbe23928fF00F38316218d9dc5A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF68A362c00700d21A8b6eEC924e0ABCC71f34d05",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd343c3efCBBf2EBb47C84495027791207B5659bf",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1a595C7aDB8F5b5526d3646d1C158e99b734d2e8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2949cbA7768018080A18234041A4E107a76AB7aB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x42cB2622ce5790464006d2Cb1cE2E325c3ab7486",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x913EEFdb4733c4208d0d842982e694a012447084",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4A3151F431E60D0E097cE0f8aA492633826bc441",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAb4819F0666D5156A0FcB8548af56Ee95A6768fd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x884D089eaE95da3641C5EEB9Cf67Cb2d1f63b631",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbaA6bb3893778949eD42511B8e95DAF0EA02573",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x74fD854d8daad8fFF0E0960Ac77694BfA356c5b6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe02fAC0AB88B8E19bE7234513944f4fdcD160193",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBCDe673E7Aa4eFc0892C0A796750506DFc802093",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5BBF3bB0CDE46E32133bd23859F726062d4339FB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x66Eb2f9a59f209ee4D320c639FC1c224C66022Ff",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7059De4E0c27a2087F849Df21a8636Cc44faC9d7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6740A2EF44b98B724B8eF55B3e433E7B055Ea3ee",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1f18b570149730e67D6992D80C74A8Ad0FC1B9A0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD11e34f77e3F82f165fE96fc3C3F6DE309eE9B38",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x37290906100Acc70Fe480F136cC43026bd204028",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1e7F481Ad51cb706f8DaDe68BB2e94CB651D4724",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x129631915A3Ca10B9a159A7Dc95Bde0Ba71682D3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25f37aFDDf08Df40C636dB75A8A93976a31EBAfE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1CffC3dAD287cd85f0e7e396087c687AcF5dd3ef",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1f527198f8460132246E08589fA207c2000C81cd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe1B609382D115D355e65A0EA206290FbD6cCde06",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x860a92da28592bDDFc94761dcD21969345D16A5d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x059213d0aDBD35DEf06aC6736C8bb310360C8a5D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF3478375683Aa1e89a867E23A60483A5cfb51c74",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE0D49f2cB863AC77B1515f409B95449a4F8456F9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE4dAd2852a674196cDE6ae4809F1a081afa85108",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1e7c4a7Ec5eE819c6d1DB0C10015b73832752A41",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6580EFF8FD09f3eBc2ae7AbE6eF775D9c7aD7728",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3213ED0eaCC8dD28A5DE45031F25A83D8FA7D361",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC558bF5c3b336600610804A1e94061F4EAd2C934",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3FE0D04FF774b5E215eC20A2475528236e81d343",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0094CFbA72eFCAfe4d45C257a713414B9502a348",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5E22900dD7C41b1a40342CC19DB2125900aECF16",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDfD521fF2FaDf24C2e908c4c166CE46f5AcD76AC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x373Ce2397E889A751509c2F4A069D4899b90ad87",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x810171f01B8a9BF1d943dbe17aA8D94ccd5774f7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44f5E9DA896dD27c8294D7570E2D08bE402D438a",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8c67c589Dd06605BdE68c14b293A5b739c5A9E0d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x273442E8123831F2e2BAf56d8FA7d5Cc9c97930d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd37331D75Ac2188170a36037F7fA671a7111bE06",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9621B4048Dc124F9F437ED51e33aa38B1483Fd6C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x76A010da4799ef1446A5df29A3905c123f654F6E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa7543f93e682FDf03B073f240723CDB2f306e126",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54ba3aB7DfC2169369E3bF41076355fEbe1CC7f6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9C745752996De57aEdCAB295F329242B8324A15f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x154AA5659623571F965323B2efE099dab25779DA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2869DaeB6298e2dF78F7A19535D24eCC5c6f85a2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa89BF84e4b63c8cd8D86a747D24f24A250A874A2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC06b4DF9a912D885A3d22ceAd70a4089A86FC310",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x92F1FB38F1B67a4ffa0A1b4c2C1fEF432c177A7C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x998ddfC4Ce8cB19B13050316d5bCe7d31a584460",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x52cb973DBFDdabcE4f4904F89B2F081C44DF81B0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF8F1F6846b856FDe3210061d2bbC8EF43E356e7F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Aa802e01771C023e897beCa5D24811dA956a98d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f739ad7CA34034bBAa2E9d0497588d9582258DB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4Bba19BA821c37b29C586d071acFC1728e1614A8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28BcD7D3f03a0f5eF0d8eC0397FBCC29181B1929",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x747984A2Ab8e78F3621589DB0Bdc3E765d40bbA5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe312b093BEAFF1C2Eb6E889B81762802E6d5a74a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x922B0705c47e048E0280F35a4755411b93451bd3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1fA0374CD277FCD50a2287628Ab52cc4E15a0bC4",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x009b32198b47c8b8006c0c3483ba90A7FA18F8f2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5eF4072B4416fe1c2B497777a0A08972B4F6FA05",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x947126a9Cc0d4aAF4E51355e5a754C19df0C18E6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA5Db44e5002D9558a04337f50f9212d5ce715A8A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5d05D702966C821CA923e8A1b0a187a7e1a2a6A2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd3793500233f1637Cf74F3913F81E26F430E9A9F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3139b06498555b5c5E3409772315217412d6C676",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x443b29e221b54f7bE8C0805859f57028CFF0A1CA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC20bA3d0ce47F54EA2F160E87DAE916A58FB903F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8c2e9a4052A2A82B644B868dB567B5b77F045D81",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE99770A771C2703215036cb6fac56d050B182d92",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeA9A3C820b372a1B7dAe5FDb444e8f3f34ce29a5",
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
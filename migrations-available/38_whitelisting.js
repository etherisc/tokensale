
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xF48e9DC747EEaDA9afe96221590C94073c39fe05",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5E22900dD7C41b1a40342CC19DB2125900aECF16",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x05AbcB0E92A620451A484a565A2807d28B2CF877",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56768c4d3862a6b0b90d6b5191795acCE13f1d28",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1a415486734edfA80c912c702053B229eD8DF72a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xab303495f3Ace0759dDEF4eeC57ea8a18eCa2D27",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x034338064336AA5704763f624B6152b06e09A316",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8333bD09704c9cf6d37F851Bc489B40a49CDf1Fb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3B17da733787493d4E13ecb18AfC7DC6ce031026",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xBB8Fb36e6Fb6E890cb3E5397494e72e032bc297E",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2869DaeB6298e2dF78F7A19535D24eCC5c6f85a2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10E6E6FdcDe16e04C92a7d246BF2fEB155fF409B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56B0512c3cef8cf90B3f09fBc0578F04492cFFE1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8C11e07F6EAF24396B695720131B87b34C082A4C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB15dCeE154446fc0E3597Fb88Fd95F19E7c51f22",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4B6B894019D33db89B7Ec5570bD038A301aFE91A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7e9eAde6D1E92e395CBF12919421a501ff0E7A05",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8c2e9a4052A2A82B644B868dB567B5b77F045D81",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x74d73e9F80A7FcC4E2d1eDF67579B2D8336E0A33",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc148a86FAECC3b3F03656FCe61c21B6b934DD8c7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28a32a02163728685f8EC11c94F4CA9C01E175D2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x401515fEE4B494edD710B1bb5232Cfe813babff9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x458f14497244E14f27AA4ACFbCE267246970049e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCaD4d3bD732F7956A5Cd932cda85F22334D28dA6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1540c64E56E61E144EbC701C1ECA6feF23423E85",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB531670efae115f7DED0A9A850C6D43F638f8777",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6d051308BC6de83564a146B094c890bA727d2BA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31aB7A54D3bE9AB7d08390E7834A13c21f6BBD21",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3775Ffd8a7be3D956863458f0b75D5D3030FA893",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4EaDA5fFad5A86A295549Da26F78263074a66796",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC20bA3d0ce47F54EA2F160E87DAE916A58FB903F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x009b32198b47c8b8006c0c3483ba90A7FA18F8f2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9c9053A0D1587E4ebA73c6D32CcdEDFaA5a83be8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDEFCE9456A09016b281579924057cd6dCdF2Eb52",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe312b093BEAFF1C2Eb6E889B81762802E6d5a74a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfD83E043ADC8b31D85B454b73e7EDF00700fD02A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x80A89FC32d03031aacB58e11f88637373F2627d2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x747984A2Ab8e78F3621589DB0Bdc3E765d40bbA5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x80a206C0fD7C0eA1BfCC5301afBabcE01738E8e9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73BF7A20C5a45fd0598C999D119B41E41561d930",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa73FA1180c5c9597146B2e3b704847b00016D2cb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00f7141F311bE15027c33c934D6d087f7f96AC81",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1f18b570149730e67D6992D80C74A8Ad0FC1B9A0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51a23573A08834F61CC81a8D072Ae2D9Ab6A5989",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAAa0cb256804FB970c65BA0fAD67CC4Ab7aB53cb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc037961423079DDD98B99BE89a49775413BE2011",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6378a11D808Dde4924B95A9777723c931CF1319C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5DFaaAe86278A463f941B79eBEb31F648e3Ee519",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x20192200371B9942AA116F747DB9dB8E68F9cb02",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6036a68fFC7A331a1f3B4112a2A556A54839C152",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFf1C08081456d375ffc637E59fbe72fe4CD7c1Be",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x776CE1f4CeeC8CA50F55457D4BcBaE2f52a23731",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x96d33b40bf3dfed78CB3B6765f3042636e77bF00",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC4aD7F7bF5E6C0A7aa91717510942898bCe5eb3b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x340BC157038d4F8e417EA96d9D346Bb30E469faB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd2D6457F2a6765032422289ac59d7a736E76Dc86",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x179E64f1DD0118e5b1515E62D5933c4C048e8BF6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xADe2A5E0F3070965cd1d2186e810e9DF8c1fD87c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb2222485B7571dAfB81968a3B871a7397E8BbA85",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8c67c589Dd06605BdE68c14b293A5b739c5A9E0d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8c9dF016F0CcCC6523bc8742F3896bF103143034",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBe7e56D39820bB67361638F02dc71c76dA99153B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD1970013898B0F883724EfB973da786eAaBE68De",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x940111c068d63a12E3D145453856401c0d1c5644",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd0965AC6C6576726c07c62807e6Cf6F2F8aFF6B1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c2AD31D3c6f2D179C43C58cED5EAEE74a23b54F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e30a44611c438FF20f25eDA5317e2A4729Ffb13",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd8b2B7F42873F111348c835563e26865474337db",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6927F6Ae8413c602c4A943E5f228D8E92B1d97E9",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4556a59d1E487ce9F062A6faA1381ee0Db859Fe0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc69a7925da52CA37D4d8Ba62967E436b74AD688c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA7d01405ac2EC04C321274AFDb6E7aB8b739f236",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9621B4048Dc124F9F437ED51e33aa38B1483Fd6C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x140CC9A0419fe50386862202E4Fb9b2D2F9994DB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51f6427d4995deFfE460787DE16439c1262AB255",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x56b92C22E20904B8B3158fcDD508b047f97ef6Cf",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE4dAd2852a674196cDE6ae4809F1a081afa85108",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22a05f2Ec93E25066c5683af4144e5DDb7c621b8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x39951B171Fe018830216fefb16d3B0B8FBAcE9E7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd41A22960df84074B7D7bfDA3FE38975A30a7F95",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x08a7280e58FD7d1814C3A6DE42d8859e8dc134C2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x041775f4ad4D41364895ad165344652d49a7a6ab",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x24A49e4C1c98846d21F7cC215717E6E6D9010D2D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5377a47b4fcab62d2AEB699096f831684D227Cc2",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x003F27cdA70A8B953193Cb6B783Bb0e77B957168",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCc4ff32AF9DD3B8F12e9b3f5C6766f40818cD197",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x267eb0B76c4a182B539a9Fa45aA7851c5F141676",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAc1ce5bF8503BdAE52891b76cB44c77da3F1Ae93",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3c8229B1EB047135d5405fF1D686AB348F8E837b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x83EBf9dA1B9C31eD6317E6f6E38a5cE59EFFad7c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x049808d5EAA90a2665b9703d2246DDed34F1EB73",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdBD39aCaCf8cdFF5DbCd8947b1E4EBbC25A0D123",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2fdA7fA8EE014DeA8EF792BecF057B73244d9AB9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbeA029839dbf9b7772B541befA2d5d006812F3fE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x863AE8D0adc29695cD8ba0fC5BAA0c5DEf97234E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcF9b1A64310767adC05bc656988f88dBe551935f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x62cfc31f574F8ec9719d719709BCCE9866BEcaCd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaC5916e083a6CD940d1FAF70f23373663D66D81d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe8cc2A82A520528dA3836A2124a4004D4dCaC5B5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x259185D9554b456a9df25752bCbA7992E83a506b",
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
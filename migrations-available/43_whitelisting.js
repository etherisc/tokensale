
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x54D8d8E533524163895CA812E7299896170a4EDF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7a845513362D9389be89eEf866Cb8A2bE57A386F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x523CA1171fe02dA72dCC03758387cfACc2286176",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa0873eAe6618136f9d77A94a0990455B97778EC7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44f5E9DA896dD27c8294D7570E2D08bE402D438a",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x523c9ebf83B2E39E310277eb60A957055f9146FB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48A6216F5736502bB3eeDE3416E8195e4d344ec2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc038ad2Fd744B4F9975b800AB48C6b3dAB1757F5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x154AA5659623571F965323B2efE099dab25779DA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44fCBC53D0fa5D0B0Fb7C03056348f8582B3Ef8E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Aa802e01771C023e897beCa5D24811dA956a98d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x64b1bc7745e419c98593275b20B5182e5233523c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB99E3f962E2442BD5ec19Bd9e7EE29160418cC36",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaDdAe8f7b537911EA5449235d48FC74A83E3B3b2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD371519E9789A5BbD84fAf18928C80aB243F48c8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f739ad7CA34034bBAa2E9d0497588d9582258DB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x381a17eb78501498fa183C81648B4165826E1af7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x68568055914bD2C75cfECa448cb08220ae9c9e5C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB9cF7DF3eC3A48AA792dE6A94a7d735454Af19df",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7c2Fd381eaa7e627A832f98C01d7A37393FD010b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc9b690a2e3667AB5337B9dcBc8b62Ff27bE4e7A3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x392091c24476B819B9F9B0AC836e519cc8b16920",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3FE0D04FF774b5E215eC20A2475528236e81d343",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAd21D247510a0c744342aC7699bC44660d00a958",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54ba3aB7DfC2169369E3bF41076355fEbe1CC7f6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD67C1a612425C03ef5A29A64B6c1E58620015C23",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3796603558635c8a12552Aa0d872b3e6F12Ee8dA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x07b33B5731aED5d4Db32E7cDDf20862A20Bb8c03",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x302E7637adA951E59616deA726dfcd1cf68a5244",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x99bf9D13581eb1c3051B9863216c23558B4f044b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x15ffC8C3E3AD31562746a21f4F7E5ca45307C52C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8d3Ccda02E3D205cB50e604197aC84deB2f53e24",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25d0035E46Ecc6de70c808A73812d377A70b9DC5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x630698F9d679F232ebB044703163BD7C40663d0C",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb1BC9E96f3D596C095Db9980a09ffD3042207dAb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51545fb33724F6698DF856599Ae10877083f69CB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60D38778ADbBeeAc88f741B833cbB9877228EEa0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1dC9B91DE003fd503F25cB5d114cf0fc68F7aFe6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1934B3d5d8853fc6CE62DA4B25B055787739fe29",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE0097b155456e6390e0b05F96974E20A243836F1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8efdB5Ee103c2295dAb1410B4e3d1eD7A91584d4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e911f7448FD9389eDa8B3C850ABe1B76C7BFB0d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x05291f641D4bC612Ee644cD41601bD4D6cFe17A0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x007E48A5e307fcbe23928fF00F38316218d9dc5A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7233E1fb70461404a25401d35880d81EbbEE7E4a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd3793500233f1637Cf74F3913F81E26F430E9A9F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2d92214855f88f1a3f24B1A3f8F6d533CD0e2E37",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56D550B73072A51261F53D44E1331d7C7DEb0E52",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x75d8461671AB9D610c84e52b7A2438cCf96BdB89",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6D37779389eF81A8E2e0277110dC1e796Cd6E0f2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0cBd6DAe010aAef7d6B3993f2DEB9a2ab627FF5c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe02fAC0AB88B8E19bE7234513944f4fdcD160193",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2427cC0538515f3bF1Ff5D96dad49d96e91984C2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x412C8dc906e72736a015bd49b4e86971422E6C2C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x242a807B8b1cA90b5d59df287818B94f2f38ff1D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5F31f44484AF691E513a3793d45BBf3ea9c51793",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3193d924C0F0CaE6D51ca31c847CC412E1B4a610",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7F1E7Eb71574cFDEA195964B3C780F9fF91a3e2C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB6cA262290B14449bcCf5E7CCcd21D106AA7622A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3f59EbC3bf8Fa664Ce12e2f841Fe6556289F053",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDfD521fF2FaDf24C2e908c4c166CE46f5AcD76AC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31D04A32F22022Ec66AfE6C2351db768ed32B873",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82DEA6e139657092BC51c4dA24dd1d08e4B1C383",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8eefab29695467A9500C57C92abF39FbEE4c9D93",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9a2B787b870aDA6d5923992650Fbaf886Ef7E8f1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8A31EEAc24FAF8cC29FA11B6387950a68ADE8C72",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25BDabB2Ee6a8081F1D2C26Bec0dc81a3244bBA7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4e3E70B0019FE1ab82ed4EfD53d0C78EB7E072C1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x443b29e221b54f7bE8C0805859f57028CFF0A1CA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x442859652214F2Eba22978d3FD1dC7Ef83ACBeC0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC1d7E36cb68B8C40Cb27C3b2460019B4A015F318",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeBFf84BBEf423071e604c361bba677F5593deF4e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE99770A771C2703215036cb6fac56d050B182d92",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x35FD75652169735AFAA29011A7D3f650BC2D5A5e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x01dEeBF8236Bab18608b7028dD2011c88205bb55",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD77a6064223a59b5793c92203f2504CAE1000670",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe116c3A741E5AF84cE6c8E5B7001BD35Ac76481a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0BAB6A91ed47367a8B44e325F45E246aA47195A1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD1622477351f56C6233d44f26FE0bC0D5AB7467c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x09B07EaB2dbfE284f85AaFC2a1a5F286ECbA23C2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEFB4170241bdC2F264978509C500553E04785828",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9105b9714Dadd4cD549122Ec465Be0A5a0B227b4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x301605C95acbED7A1fD9C2c0DeEe964e2AFBd0C3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13d62D5A1963046A3caCcc3097a4576D1f9b42e1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54D3b757e842A0f9412D0829d6deDa06F23e7416",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3765D4449f54ce6690F3be4b91DF48F7130790D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB26b0016eB1A62F64f2EAa4BEb2D7579986C1C86",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x395512FEdd1B2236B03533C2b46EF0cE89a9aA7A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE8F08b2849d999A894793bEc75451fc8299AA76C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCB04F9F5E1Ac544dfFb0d479b696e7AAdb76dBFB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x339856531761745Ab0b70d1c9513c8bA904ea186",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x999a4ce7641e0fA0bf590A482f4486a8894162Cc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x088212A7E6Fc50266A1344aB862653fb0C4CdD70",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x734f44685F28Bf46BeBc8c4AB18aF49918419bf4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e2C2B1551e12272b3A00D29BCa50b4914f5066F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xceAe0D50294Fe4663a99fA62646AF7069E118733",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x595971b2b7bA20b149C16B234E28902308544C05",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x568fa01fa0D90D840E9b98ceA7Fff213305d6Db0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEF3E874bd07AA18A20e4896b2DFE6010c71d00De",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x78F0EC8042648e8D9dFCEBa2d972A08fe610F938",
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
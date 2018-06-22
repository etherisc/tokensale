
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x412C8dc906e72736a015bd49b4e86971422E6C2C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x43e0c17a2ABBED4F041c968c778462D29D11226d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe9E9f2d506D9d66a7B07e4F86900286991Fe6d89",
    "300 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x567E447A07cF8D3A02613fE4b2fFB901A6971D9D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x70e9167776061C563acca07A92d25DA22f6dc275",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x69Bf89C1Ea8378Fd309765d04ED92c81b3b00934",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5536631e9954e9F18EDE829F9504CCFeb89496ad",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60256530d074465406Df460B6f38424ab5dF6BED",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xADBc69b07B839CA353177B5A22013B30624D2dC5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8efdB5Ee103c2295dAb1410B4e3d1eD7A91584d4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf3ae4bB5691b9D45461CdCdd4bECB0C9986a3237",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8Af2205B7e43478588AC72E62FD406fC159CD06D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5b609868f4d98929A43A2c74B96BEB48F4d611a3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00530d56d05dDB465dCe9246F9494b6bd7875343",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9caA47e99ca5C868aB548a6399621a5068268Aa4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73BF7A20C5a45fd0598C999D119B41E41561d930",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xADe2A5E0F3070965cd1d2186e810e9DF8c1fD87c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAF660979107fda019b41cda0D3AD3760Ba22707f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1dC9B91DE003fd503F25cB5d114cf0fc68F7aFe6",
    "150 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xfdccC6E5C635F77A97d4035Aa7Bf8053eadF9aEa",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf7B348215B1959F921927e980cBB767c09A42dCC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe6D1F4774a4144B3F08897982CD8dF5C05EcCeF5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6A4bAB3AB426b32a90C353aE450a1D9712d67d64",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x630698F9d679F232ebB044703163BD7C40663d0C",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x155abb4eC230d10b386668710fD818c671088fB2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1d597B87f8aDF5d1944A7df6254dFE97010c3199",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3f59EbC3bf8Fa664Ce12e2f841Fe6556289F053",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb63bB26B5F1BC02a0382404dFaD129BeC7d285f7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54D8d8E533524163895CA812E7299896170a4EDF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73075c8529AC2B04A6e4b6f3a83e38228Ece624F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34A45b78118e2E0508b5908DA5E355848682E338",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x79E063a8288dfFB4156F42210d765B975Aeb0957",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9f8be4c44396F8C8922050Ef6F1B28f387cDAbEb",
    "9 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9cca8dB670a0cFa97BB70dbeFe176ed5Cb13EAD0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0cBd6DAe010aAef7d6B3993f2DEB9a2ab627FF5c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x523c9ebf83B2E39E310277eb60A957055f9146FB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAc1ce5bF8503BdAE52891b76cB44c77da3F1Ae93",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x242a807B8b1cA90b5d59df287818B94f2f38ff1D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x492994197F491D89cCDEBD60Da2c972113bD48b6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25d0035E46Ecc6de70c808A73812d377A70b9DC5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2B3d727B00a0E08cb9604e07e8D5607e3123EAc4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5947A4aa77a2c32f16A1AAd9A2Ae3a8C7abA8A72",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb386B3370F3C258d241fED394050d60F7c421bE7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x778D849C9Ba698314935a1836c455BB7bc28B3d5",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x78e80C4837F4b35D3a615198937b4690714943c5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x002848284eB655a5a99250fFbB09605B8e624261",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6339d36BaBB52F4500519DD7cC95171b18e278E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb90781Ceb500f80A9c101225eD5451449a3Aa5bc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2427cC0538515f3bF1Ff5D96dad49d96e91984C2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc77CB81a0b126cfCf82A8965Fbe27C2F3595bf82",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD371519E9789A5BbD84fAf18928C80aB243F48c8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x897F21219228922ccDE899cD79b55E03de0c9DF1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFD71Cd085a296aaB5017810eaaA5584931EF082d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfC87aaf00109738E0254B0e41734689fAcd9927e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0086ccB4B36a2A27264b2D9A18D98C93b246b7aa",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9d893c360F08a28efBF8696942430Ea8C9921547",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10E6E6FdcDe16e04C92a7d246BF2fEB155fF409B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa6a777ed720746FBE7b6b908584CD3D533d307D3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x33731945cAAce26e78Cce37FC803a62f2A13daEE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00A839dE7922491683f547a67795204763ff8237",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x09B07EaB2dbfE284f85AaFC2a1a5F286ECbA23C2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82f8136eB41e3709F0343ed09Bf7B3dee5C11648",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x85cF050Acdc58dCCc912720de49507643E86BCEe",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11A6CbA357101aCB45cC9bAf9CCb8898085EC92F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x89eCCEEc77B11172382d452217E9ef635c013275",
    "20 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9f54bCcdDEbCB5Ab396a67d16C50ee9647D15139",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x56D471939Db2CDb9f28e9599953C1828c96fD44f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfE5D6AB434227d0AC52CcB2374449AEeF509f02D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2fdA7fA8EE014DeA8EF792BecF057B73244d9AB9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9Ce8d776E99Ad38220eA387592f5f0642f4A1e2E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe71A8585E007e73E0FCA225512f229856053d1F9",
    "300 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB7f6227F09CF8Bd2C8897c71d3b980F42ac95544",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAb6f4556cC5006Bd4334E4a787aE44f2BC309243",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC7B51a1637F86F130686EeBd1AaE67c051888351",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAF13107a27b4697c0151Eb32dE298A583698EE5C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8832f9860319194e02d3F20fB50B257c87F3C992",
    "40 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B6fE7C02DA9aa2510c1B17b13e31cBAF326C802",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x357ffd832Cde866F7e4C2eA83b9F82b54bf7d921",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x50e84ED27708FCE058C9cE0250cEee8B60c0587A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDdA2dD3BCa56eA616111C0F6B8aeB5a7b6845D82",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0b9210782963cc70466c6E5B7F9e210FFb996e5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x24eefFBe8a04063Cab00913c251dE830a37346b7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6e5ba5499bd4BBA442Dc88242F9c7929AD3151eE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe9F3e3247Fb2F1B8eF9c890ba3906b44C4D0235C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x30D548Dc9F4a9d53d25859430C2FdF32b15efCF3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32F6B5dDa8c7741a1aED8F2b58232Edf7A5DC0DB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x741f1A0bee55E541C985D9183d656aFdEF2BC3a9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2993E1D02b11377f44455AEdc618C705acbb0591",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF619C7B3Bc1c94f96979eBb2503628Ecc6ecefE4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeFAdEF57a9620c525Dbd9B12fA286B205feCe1dc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x863AE8D0adc29695cD8ba0fC5BAA0c5DEf97234E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x646385323DF30BEB9356677C808Df7A6f87C8e25",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB6F84c4ad41c44053ce231Ae42106DE20b6dEeb8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc69a7925da52CA37D4d8Ba62967E436b74AD688c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1482f945857685ECF568287DA2b5cCAe185BF936",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdBD39aCaCf8cdFF5DbCd8947b1E4EBbC25A0D123",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf37a5DfC8E3c2c46e57a23f6Fc0DE6d1F8845120",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x603B15e126A9c1dB8B0668e82f5E506b41d53275",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7dEc36b1EB0726C31e83EE37074c278b2a867BD4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdb1c54F7c3D367FE2Ef964C99e2fD2F322b288aC",
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

const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x70e9167776061C563acca07A92d25DA22f6dc275",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x30e26727cB1904FB30D36e0545DaDaF57024Ef1f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11A6CbA357101aCB45cC9bAf9CCb8898085EC92F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x66Eb2f9a59f209ee4D320c639FC1c224C66022Ff",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6A5B07c29b46B9AeB64c7612732Ad8839264be85",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2Eb5Ca7Be0C61C2B6f5c744Dd1899fF4aD8bc768",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8C29C31bFC87B2D4689F15Bf42D01F66f4DF2f3e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF4a4E11d8fC26406fF6aa20c74b17544903B09f6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9e22F4BC2D11c08577809Ee8dFfe90677D23ca89",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2B3d727B00a0E08cb9604e07e8D5607e3123EAc4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x372Cc010C6677434739398463c6BC11e995EBf26",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8A0F770625F4bf4529BF6BC679854d738C3FB24b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB4f43f147c95FFC3eAD08a4BC6C4C5c9329b668c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB9d800cf1E46EeB00cD1C15a887a2C2E049C30eb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5c784C2dAc5052Cf806BF9e831e0848C887dc5a6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB9c9B055dfDE19F99Bf224cA17e20A9b5e4D144e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8E192b8e5f5D878596E7f1c16828741d85F0214E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x371C98fB569e574951FD3a6a74171Cbb6665d6f4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc47C291ECE9319CF5acF74704DC816a2cE14A407",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2076f3Ef6428e1243De39A6DF2d75bBA039ce985",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8016C45b2C3f08a8100B2839b4263222cCCf391F",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x911A40527CDEDBbDCbC5C2b117A3B71Ab9378997",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf7B348215B1959F921927e980cBB767c09A42dCC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82d5AEf85fB1F6228902abe2D90E49c3aC820539",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82363319ea1852582aFeeCA0C5d1E6370Cbb8cA8",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6A4bAB3AB426b32a90C353aE450a1D9712d67d64",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd087E6927B37937530F2CA4Fdad203A5EE6Eae37",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7f5B312097d6c8909c29682215d1f4ad3CF95613",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfdccC6E5C635F77A97d4035Aa7Bf8053eadF9aEa",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC7B51a1637F86F130686EeBd1AaE67c051888351",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36431e41Ee5570329B998E37C1901eF4EF0Bf120",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0086ccB4B36a2A27264b2D9A18D98C93b246b7aa",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86C204Cc6857f820760b241686C2abd7319944c8",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x797Dbc2fFC7f56B3EF35beD4B40c61F89Eb6E4f5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFbA65C729F879F319EE4eC6fa172aA728042cB35",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x165D461d3812B57Fba59C2a69BF294fB4A7a5Ef3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8Af2205B7e43478588AC72E62FD406fC159CD06D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x092416b09E32967BC85988138f0993DA8D8b4A61",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xBe87c5bEAd75a079f5593D0a3AF9099F777D7526",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9C3E6c3bd9f0A2B845b8f362bDf7Ed6AEF2928d8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x79BF00691a4fC9cE6bcD6C8320FF843b37E0E605",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x52cb973DBFDdabcE4f4904F89B2F081C44DF81B0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3576f71d9fC9026f545d1cCDF38D6ebf4963E597",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28bbf0ef519F72CAFEA000eaf64ED679dbdda738",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x424798d74557A4Be6Fa1B7CD3344093DF10bb075",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2c85c8d5f504199a27384C271530e978F35C47ce",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xaC08cdBd8adF34f1BF8809245A23eF669023a7B0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32F6B5dDa8c7741a1aED8F2b58232Edf7A5DC0DB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4f803d1863DeFA11FC8FAed474E97cBA1c33B61b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3ba1f2694e6217B606eFCa098ad31b5fB35841AC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdE193b1493bb1724a621678035E47A119f5D1637",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x603B15e126A9c1dB8B0668e82f5E506b41d53275",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf256E5a7Dc244FB34269160103392680825a3956",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddc1dd09daB5C4efBa565A6c242361b88Ca3C9cb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9104494222DcAA28DDbB24EF7699C0e3E3B43e1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb4c33477B04933c2BdDe66c76fc0E15dCab707e4",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x907cB6b010092813439Fe52ba50c24fa1765F3eC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x20e2Bd376B9657ae47704187Ea788f104F1C01c5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x155abb4eC230d10b386668710fD818c671088fB2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb30b3cAA83A1f5092FdD5103E6ced693dFef3b8B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb22854dF41D8F2B3F5d396A75207C23B51Ee9De0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1071f65946FC8f7C3E76a435E3fB176dD189A25F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc88b81baA865dA1acbF1d7c113243C5409fFC960",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4DBcE1388e08daB37535bEcfd1F3b28682FF42bd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x035d1A83B14C65d9283d85f78FeF1c3236b3D109",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x567E447A07cF8D3A02613fE4b2fFB901A6971D9D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7dBB8145145175509c32294D7AC01Ef0D8c4fdf1",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4a25BE1a6cF5c6d9aBE9271Fe67366c8f5be15E8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf5f278481BE15b1CeBA47505F210960F4063a05a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x81527A99C5535E295b2F8Ca879D6DFf9ef124623",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86Ec28800ce27DD2824B1dbF7E8b9984C9268337",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe9F3e3247Fb2F1B8eF9c890ba3906b44C4D0235C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB43eCdd3b1dAA0621E2aAe02840d6a0B81ce765b",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB201ED632810922B12A3A17F7abBd4F77C74cE5D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00530d56d05dDB465dCe9246F9494b6bd7875343",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6bE4C8411e3eAb78a2afCc950EFa3e717DcC6120",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51Dc5d339D628DDD1Bf7729bAcBB24B03a61Ad1B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x090ABBFa4A0cd49602596162E411D740ea595Af6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x748eB8DB6762EE80624Ab083BAe059641f0517A7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x03d6968F256D052E9e7777361C3AE4bd266088aF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8F3F437d124Aed4dE93641EE331ed1C422eD22F3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7C022500136e33F6c7649c3677DE5D71dfbB9eaC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb8fB09eA3F982b62639Bea48D58B2CCf8C00D92F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8287ae7B97de14609DB95cEB655DE3CeE54792d5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc19561d86ed347fb6277645376FcC8b02b3dB710",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD4AC262d5E38b720711419B4aEbF3c34DA7C5f40",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe6C58978D013B757eB315BD6fd776bEe2ee2b63c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe1ca89DA2054EFAF27bfeE5DA59E3d2645AF7FD6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4AF88633c6aebc6AA8C50360c998b85673015FaC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00e83056D6ef418aa99e02A7da07c5A263408d4E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEdF72EC4134a483Affbc73bE081EF4b64dEF646E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4B0CbC0ce35135C9B1BAb1108C3Da3C3035504CD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x083bF340594B1a0d88578AD21eb913D1232B881B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x77a1438B1337EB3432fE02819Df235771a1346df",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5c2c74474D5c6F0C1540671aDe09446F04323c24",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10c92cAB84d4a5C8A4736CB44FA8998b2a577ACD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x35dc3b24caa45619157DCe29aE37A65B7DE5D267",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x059213d0aDBD35DEf06aC6736C8bb310360C8a5D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE24dD0c93CFDcF202A855263E0674C9Af1C00794",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5ed8833357B4cC03D44D48C0d21E9Fd32B1fAE44",
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
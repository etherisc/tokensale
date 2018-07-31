
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x357ffd832Cde866F7e4C2eA83b9F82b54bf7d921",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x15EE64d2fd156631c2c7727C5e2D3a6f55539902",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13F7b439246bd0865532DF51880751A12832d4bd",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb98F8D3e514F8069eEaeEa36Bd3f0D92DA0038b1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf57FE59F0f2e72b65E34CA5C4937Cf04a140aC35",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x78ab42B7B69d92CE4b25B959f179D592D49A0676",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD11e34f77e3F82f165fE96fc3C3F6DE309eE9B38",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22bcCc1001BC6b8F5D0F0148B34ef7eB1342cABd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe82a5495707c327b726E8B1427f1BEE5eDbe93Cc",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x8D259Ab394Ea6D400bD6Fa6EE48Cb7Af2b996df1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x40B3946d34a6b67E65fb00Bf19cb92cE0C3E3AEF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x84E13BA3e77e5fE0b9209ED335Ae9054eFe5A8c1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB635FA1A4E7F1f2edf5fBe4630040cb6db0B40af",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD5DeD470b9e0b65db7018Ba463D702Ca59adb989",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfC7d5e499f869D8ee0b17C61b0f6f83BbAC2FBc2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9e85c752Bfd62F4fD26C7a10aB23f4B7c008f9F1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1e7F481Ad51cb706f8DaDe68BB2e94CB651D4724",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7fdF58de18596b9C9309d3dF74A1F67A31ba74a8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00c0798C0Df1e87069417E76b8Ca4fA089D051f1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4fbfadF58cf32E7c616ED09D74318fe30C7071d4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86ed76C69E4D1f7Bb33846e0aE54971Ce3dc2559",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x07bA040A16D96045173369AE220a2C63cCD8905d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDA35c34d27ddc0bb42F5474a602e67A12a536019",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3E499bC8a0e9Dc14993e735744Ec071b6e12D4E",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4cC930A91865E30fEfF38465ace57711e3923881",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAb6f4556cC5006Bd4334E4a787aE44f2BC309243",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC558bF5c3b336600610804A1e94061F4EAd2C934",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE2E5f8e18dD933aFbD61d81Fd188fB2637A2DaB6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe1Fd5BcAafD73e46fD13Ec11824D64253aDCCEcE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf102f0471A8Ac15fF31d55E06bD365a4f5c59063",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x23d17851EA2F1aA39Cef7849b97C3b14De0FD661",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcfe4a38f17566fE0833be35C0C325E5f8D7d3852",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe150C83Df04aac2e176beA805CdFdF5e85441AC0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb525F6b3b5EFCC0C54582de2F08D890F7793e3e4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1bdD8ab1954939e0Da7aF93DC06649f2a75Eba5D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x404FD5C18f192e75e98356e168389Ac4C223f441",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x67cA73911aB8183F427064d174E24f521BfAab85",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD7669CB6bcEc3a9e9Cd2Beb38074ECd267806c47",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC0D1ADa5B5f7b6b42ABD00883EefC933D20191A7",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x34b3ea53b6Ea84bC01A272d6A10E4d47521DBFea",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54C4849e1D25dA384B8b30Bc2fA9e03267D317f6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9eb0b7D74bD5739648726Fc15C81DE1cBc9b0800",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7639Db32C5b5984A6F635072a511AcC6acA6B474",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3e3C02a312464f6bAF071Dba4DA4F76436cCA432",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF36Bf474F3d4B23e67B85795c6a5Cec2AFCa4Bbb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32eCB5Aebada66175fC5e00a44c0c4040002fD7f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf3ae4bB5691b9D45461CdCdd4bECB0C9986a3237",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe1B609382D115D355e65A0EA206290FbD6cCde06",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x891B775a08Da27995a8DEBc25c38ac08430cDE97",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xF6D319cb651E613ea343E078C7eEB228f3ab146d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5947A4aa77a2c32f16A1AAd9A2Ae3a8C7abA8A72",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9d893c360F08a28efBF8696942430Ea8C9921547",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x19527a176a9634ef8b83e25bC0FDD90533E0A966",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54D55C8F76C1DA24ae5715922117B0636A157e76",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe281800a53B90150a4f8d330509EA210c8498bF4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa0e28B7AA4e3a405eB4DEb47df75421ccC4aB32B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7A5Dd9BAbCBa6Ef012c80E0d3F51207953e8E845",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6740A2EF44b98B724B8eF55B3e433E7B055Ea3ee",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe0a952554F2cf1BB172b03E4dd1A12B94eDFd707",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x47855a1a80f5881F41dfca03dF748A59A331A093",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x79E063a8288dfFB4156F42210d765B975Aeb0957",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x17cD19694f2bB16bB44ba983808d68d71a8290c7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbC800e1416dC3cd2594404BeB6223030B6BB50B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22Fa0d9dc1482Ab8d652df8b96aC48ceB283a15c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x01b4a98c4188aFe48c2249Aff44F79112EaEd324",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e97272B0f5a4116535c207A6eE13d7858044D79",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB950842E85C05c55FAD3fF3B127D735D5333AA4d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x387Db63e0c7804d08813C025B926c88Bdb857c90",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4784EC0eE6a87b39183c4342E8234c1a1D5B2173",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8166AD8690A3E7BFb2D6B45006eBB5d111628a59",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb8558cBdCE1b54F9412097Ca257dE0955e75D92d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x29146C9632cB40ce889237537E721E9132818D18",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4cB5864C5C648b1AE103630ECA06840F02d2B5EE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb156E7F2734293D007B87dD1764a6C2D2248CBde",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x32E8339Bb76884de9545b0d4E94ed0CC736d1Fe6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf99Ddf96A533af0B77D770AD2407491eE30dF14b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBEB1FD865fEEa5006c74Bcb615Ebb00F1a05d469",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x129631915A3Ca10B9a159A7Dc95Bde0Ba71682D3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x50e84ED27708FCE058C9cE0250cEee8B60c0587A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc4A18E41f7b8A1864cf9a15e1Eb12935Ba679364",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDE4D5886da98C3A1140260aaF536a2f1262E2948",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfc73f4c90B226251756146c9548f649F3B38ccE2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x99c80bdC044223b0F258a639cb7f8CB6137CFE68",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaECF54c8c66B5C0264dFE0b632558ab6586d4e33",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x647281C9b097084d35dD9b3C98aBB58206ED206D",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x624aA1b650F239Cd7E2D99EB642036c706587F9A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0EB01Cc718710CC94c6028295C5C68aBEa58DD19",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe46511647083a455cdDe7fA780179BAA3837b9d4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34d53c8eCF31bda3AE3b8f192009df887267872C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0ee1Bd3BafB0a7B01dF1d3572AFc882cfba4A718",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xAF13107a27b4697c0151Eb32dE298A583698EE5C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcf4732aaaa77bF6E2AAAAcb4126C8e2C1620a609",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE4A730B815c1935f5e3e969d0cC103146bE3B2dE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x09f7ab811CcE7ed833564f21bbe8EbCE3E2Aa96f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3Cd551976f59ef5F5380Db3Ce99ba5B5AfdFD9C5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0FB123E29f3088133DD0e3dB7D28ce11e843A9bc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa92D7E5c05796dc555fEa95176c3b79CACE2204D",
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
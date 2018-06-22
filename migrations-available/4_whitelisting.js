
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xb525F6b3b5EFCC0C54582de2F08D890F7793e3e4",
    "5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82363319ea1852582aFeeCA0C5d1E6370Cbb8cA8",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb6AffC9a655Cb074a1d544dc906FdF4811C4d795",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9a7b5AC6002cbaA2F4278159b1c2F6fC120a5F6c",
    "10 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xc4C680240f296781299D8D85B01846b11E2Ad498",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x29f0DEF7585320cFC0B0D26e631c3C4e0898A39E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD22a3962A067472b335CF2564365C3034Bc975B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x02B322ECFD80Aa1dE6536Be93a496820a84711eD",
    "10 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x72A244797427478a7F78E5B95c4AdF15a0eCcC3b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x009e02b21aBEFc7ECC1F2B11700b49106D7D552b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x965B4d92300F5d6205362913A3f960fBC4242F9c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4dC2Ac2152337dF28113f54688bE53e7AEeE8188",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x39951B171Fe018830216fefb16d3B0B8FBAcE9E7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd2D6457F2a6765032422289ac59d7a736E76Dc86",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54C4849e1D25dA384B8b30Bc2fA9e03267D317f6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x357a139698a359eA3c4746A3B952273AFAc1006D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A36c5bB86b1D8037576FdA54422e60823067063",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3907f2cBaCcE596467D23F06D75CaDb2b5bd36b5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34aeeb80F86d1Af9b99DB938E0669cCDfd3C56fc",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x97AD9D9E2f7b58A0D8B5DAb4f7BCc6A47cDcA387",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8D259Ab394Ea6D400bD6Fa6EE48Cb7Af2b996df1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc19561d86ed347fb6277645376FcC8b02b3dB710",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a86E83Aa6B3361483A45fF17a32e1dd8F0f7fF6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE1aC706fC0258A05A776119A2794309cd6090dC5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4eA0878C6D1B4Bd9693D53650F160bDAF33f2B3e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x041775f4ad4D41364895ad165344652d49a7a6ab",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1071f65946FC8f7C3E76a435E3fB176dD189A25F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbAFFA2Dc8893e625410788395354059ec58954a9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45fE5a04aec2314E2E91C5888F426F55685Ca073",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a63fc89ABc7f36E282D80787b7B04Afd6553E71",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf0741B302e366958c1732A3Fa6Dc489f4e22a64e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDA35c34d27ddc0bb42F5474a602e67A12a536019",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31aB7A54D3bE9AB7d08390E7834A13c21f6BBD21",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbf60c09E8DDD7FF9d729d033DdAE75612eCaB98C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x81527A99C5535E295b2F8Ca879D6DFf9ef124623",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x312bb0FD25fea8Fd6da8FAb80c36152975833a55",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9e22F4BC2D11c08577809Ee8dFfe90677D23ca89",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5c784C2dAc5052Cf806BF9e831e0848C887dc5a6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4cB5864C5C648b1AE103630ECA06840F02d2B5EE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x156bb1a14f21Cc34b3920D7C0C948A350C8F7fE7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x685CCEaBE623A2e001dd23312dA2A98c18181835",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3c8229B1EB047135d5405fF1D686AB348F8E837b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD912F766b41b0594571af0188b92795bF3c0f710",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD1970013898B0F883724EfB973da786eAaBE68De",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFcc93F57b0887c1A65305d989aEF3891f9b9909a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00e83056D6ef418aa99e02A7da07c5A263408d4E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe8cc2A82A520528dA3836A2124a4004D4dCaC5B5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa15d69A910342fdF8292E622C52676736d9d6730",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1ee5D7C2319b54aCfc44F98480C4807C5605B7C3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00f7141F311bE15027c33c934D6d087f7f96AC81",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4f803d1863DeFA11FC8FAed474E97cBA1c33B61b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3Ca65E58DCC5608973f6C6654def068698B44C10",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10c92cAB84d4a5C8A4736CB44FA8998b2a577ACD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCC3FeadB5C942a0CeBD3F221C5cA89789C6536A9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7f5B312097d6c8909c29682215d1f4ad3CF95613",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa56905783d22eB52a53Bea5A24121F9aA89516F7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc88b81baA865dA1acbF1d7c113243C5409fFC960",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC934A61Db75E740025FCea5c90300cA42f152105",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x616e19c701bAa2ED883eaa59BF92808A29199e48",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4AF88633c6aebc6AA8C50360c998b85673015FaC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC9c75c6ceE5BEB0FD3da74AFC4ca388c4105a91C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfD83E043ADC8b31D85B454b73e7EDF00700fD02A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBc7eB48A8c2B01B3cbBCac663863004c6170dEf1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfeDAE5642668f8636A11987Ff386bfd215F942EE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe5DD78C224F26E306c84A9B1aa2DEF30bdf15835",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x259185D9554b456a9df25752bCbA7992E83a506b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x45521E354B374B534292005f71E776e5202CfdAa",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb4c33477B04933c2BdDe66c76fc0E15dCab707e4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x537830A9070fF3Ff5dEc709DDEBaAF118215E7Ce",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x62cfc31f574F8ec9719d719709BCCE9866BEcaCd",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9104494222DcAA28DDbB24EF7699C0e3E3B43e1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb2222485B7571dAfB81968a3B871a7397E8BbA85",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf5f278481BE15b1CeBA47505F210960F4063a05a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5B02C1aDA0b7404a2D76B69b295f8a3eB6957A6d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x003F27cdA70A8B953193Cb6B783Bb0e77B957168",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD4AC262d5E38b720711419B4aEbF3c34DA7C5f40",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2ac337B5dc23EC059129870f504442841F5Ecc92",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe1Fd5BcAafD73e46fD13Ec11824D64253aDCCEcE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x24A49e4C1c98846d21F7cC215717E6E6D9010D2D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a1801d8052607C46D3e221ebCA0aD20fC8464F2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Be682bEB239AEEc32d222e266a008C6AD961683",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD8c66F4d06891a21600F11c01e7Ab42912029805",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c153FEAE296Dd6F0249323Cf597724a9EbFfF33",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB168aB1AC0793aB4445dfD08867A4aDbCD1EaFab",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4De02fF45b08B12b723ce9672D3Ec2d47D76312",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2056730C7dCCF36A64F4C785e69b177Ef3c3d0F3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEC98Eb399519F676cBf63a34835e46B93e5FA709",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x69691cEe9A14DAf0A4D68b06cA57DE4eE867DABf",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00b0Ee4fC834A9EAA9Da5c726079391B63109BF1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0AcD98f9b8e4Ed200D32b0a9db53e5AeD088b858",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddc1dd09daB5C4efBa565A6c242361b88Ca3C9cb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcfe4a38f17566fE0833be35C0C325E5f8D7d3852",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x79BF00691a4fC9cE6bcD6C8320FF843b37E0E605",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49C55D26F092365af162906AD426986a6472870f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcF9b1A64310767adC05bc656988f88dBe551935f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11e83475444B03c08fa91d67cb6D1749b6A63f87",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x267eb0B76c4a182B539a9Fa45aA7851c5F141676",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x457a9a9F515B3096c136D839B8d809b5b0Ce86d1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDD7868983A735B88F047BDA121086bB0F345929D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Bb827BCebe8dfCB4672dB29dc767aaf151EB3a1",
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

const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xCD2B721d7462ef2B67Ab73F6DFf71eaecf4946ed",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x462585d92d292c492BBcCD1Ef28cFE2Fadbcd773",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xba6194E151572118904CBc4cF3d5100c4Cd18bA4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe08B3b4DD6C8F2745fd82360C00Bc6E9b086eCf1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbC5e5F965ee8609CE840ECDf278E5B7d7A08590A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4A494Ea6F54E66CEe8a631a46464B0823aDEA64",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x209bd20CbA334fdb052945B9a0366B1De5bE4FF6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7F229A0ffd664804Cf3cc28AE0a9D8AA773C8321",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC4b14bAb750f1CBF61715D8E8b76514957770CBa",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x47EDA7f8165549484fe1919453a20956b1875C44",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF1f3c1dABC95a6034c75006D13EFfeEc686Ab428",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA4325a0e0BFEb48B02e64c054bf1e78e28EE33a9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe51f97d886f8c0137726CC38133bCB94935B87C7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc4C680240f296781299D8D85B01846b11E2Ad498",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36F433DC97bF820EA44Dc89d6902c86840767217",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBd7a16507BcD0E13a558016B170a42034F0d5Aec",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x460B43022DC69f8ecDd0D7cF586cEc7De42104C0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x449F0e055cCf263A7410479704e7A5a47aC479e8",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1d3faFFDd38d407752A1931B8815DA6260e4Fe02",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd930386E5Fc0F5274bCBb96117b2CA926DaaAa88",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x94B7143EB689F0D1A4a19892eF019117Ef59f099",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51578d112747F6fE5715944A3E2C9Ef539d5656b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9d3E5c1678C14d89dF228495C61F3feDFDbbF771",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0E152751DaA2A36D9DF94622dCE35C84F1e33E19",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8b26f7685618c07Fd58D72c929e85911E2446a07",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x27B86A0a97e65e790fAae13e08542210dc2cD1e9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7083dea30D24D29692DD12e02aB8378A8d84dDa6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x75360cbe8c7cB8174B1B623a6d9aAcf952c117e3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x320297270E204e5D8037e034445947064286ffe7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x947126a9Cc0d4aAF4E51355e5a754C19df0C18E6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41BF094B278BcFccAf6d23212ad8A6e01453b403",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7cadb9536501c76D97732dcFfD6236Ae90E75d98",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x92BdCF88b8cACcD670dD85Ca23ba68379D6355f4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2E525DB2e77932eCAC74713D66173544fea32848",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x025f020e2C1e540c3fBe3E80C23Cb192dFb65514",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x13E042b8350856a7E0d30DA4634cd47E4565408D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5B64f12189c01dF46525fA5794F7A0075386d8c6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7e8f4C3324Bb4B94E4a24de7AC91c236c4E26676",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x281F2b769534b0955F939307c128896c7C4D2953",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e058F35ae4814bb5F0b78CFA3fAB0b4a471A900",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbE2B28F870336B4eAA0aCc73cE02757fcC428dC9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE4c9210A49B1BEa444f313E3E6DA2e117248571C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5914aD14CC321275603F0ecDba58897Ba4f2c1c0",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9BebEe63A2183d4ad001E7416D44CC029bd64f24",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2A1049062c6Cfd69bd38fbaf3b0559DF1DBbc92c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFFF07488B95cFA9D05Ea1d15585E285E14e3ba6b",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x568cb4898f8cC154d409124fcbc0e037e8e45cDC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2909B497628D65Df2423f56e702533402aB7215f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa15d69A910342fdF8292E622C52676736d9d6730",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4ae294d14b8eB2Fab26231847c61Dc49b5a2aBEf",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x925D7cd427D594E1AE73a2274c3D215fE069dBED",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2EF487B63076E0c2D104742c65841883b41479Ef",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaACC5D601E74eb7d7a55d0F27bde1719c28DD653",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf07d37523bD7cB1a48094e964C3B76E32A1357Bb",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2B8b2Bfa75a41DFB57d08E8E187F52c5C28B7095",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0C9256Cbd4e2f2BDB2a84779135793c6f2ea6afd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x04035F558b0A5dD652a1bdc379cCAf00c4F62647",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x086E1E89A9fDBF67541E63E0118c040C8866c843",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xFcc93F57b0887c1A65305d989aEF3891f9b9909a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x771A3c59CBD2Df2E0B5F280AD46c0828Ec309dAA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf0741B302e366958c1732A3Fa6Dc489f4e22a64e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x913EEFdb4733c4208d0d842982e694a012447084",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc156F36C608B610c0353a8C49DFcECf9379D784c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6EC1C4da1C8d390081177B3c6286f195a25De34",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDD7868983A735B88F047BDA121086bB0F345929D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC0B374f27abcCD5f34e30bA437AdF10f084a66c4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x71a3C8da15d871E5208A12d1A6F8d9AE2D7BC395",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x737c5cBb00Fd6E6195744ee3b98b152d955A6c6F",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xf327CFd2f7CB40d2D7fB7BAD1eA261723F20036a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x673B96423D16Cb948cc235367727b39463feB9E6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x06ecbCd51e93CC19f6ab8b90BAADd70B43bd5797",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x457BA45892A65e56Cf7185d511773df0852Ee996",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5c5cA29a2200c9bc2Bd4C4C51a0C546Fd09F4BD4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9FFd9C00a3B581ae77dFB1dc16D020306ec9f36A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1482f945857685ECF568287DA2b5cCAe185BF936",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56D471939Db2CDb9f28e9599953C1828c96fD44f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x41404557B269F728287cD0FEC91622eA3525209D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49b61b0B725be7eE97361318EA6711F5ccF55eD3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2ac337B5dc23EC059129870f504442841F5Ecc92",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1f527198f8460132246E08589fA207c2000C81cd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x72A244797427478a7F78E5B95c4AdF15a0eCcC3b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2e2f2B688Ec2fCb48742DF66F436C5eC5AA425B3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfe017fe7cFeDfEa65835d49e1b1f5ECD6E54CebD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x69A93C35122c14B099377dC587E0505138A373eF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x554e14a43Cf59D7CD5F3d5dd6e7C8fEc84F62834",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3b18a5fC640973b32b4668685dCaE182D051224f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6Ffe7d8621fCB1a1e00e31D94D161e32d40E3D24",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa11Eb84eEb2aE3124a87CFf61C94B0FE0D6135C4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x03dEBCd8F24722997eE1dC5B5a98B4435696b848",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf6dEda468Ba0afF0948bF96e17386DF5cA642Ae9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbAFFA2Dc8893e625410788395354059ec58954a9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4DD58cbecd806A8cC803A74010aCA7B707fBD141",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFC6176c5fB4C1773dD853F079D4b5776F3B5Fb47",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73075c8529AC2B04A6e4b6f3a83e38228Ece624F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4De02fF45b08B12b723ce9672D3Ec2d47D76312",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82f8136eB41e3709F0343ed09Bf7B3dee5C11648",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x869DAaa8257aBBBa3471A909CFa9c728be4D82f4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x91cB962347171C4459A1d6A1e87074DA9da417A4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x37333D8F083cBA8f9278825032A8D3214bCC5b5C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB7f6227F09CF8Bd2C8897c71d3b980F42ac95544",
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
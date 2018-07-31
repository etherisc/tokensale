
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x58c64c0c90545F49e76e853468e4b027ec539495",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF68A362c00700d21A8b6eEC924e0ABCC71f34d05",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x009e02b21aBEFc7ECC1F2B11700b49106D7D552b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00b0Ee4fC834A9EAA9Da5c726079391B63109BF1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEC98Eb399519F676cBf63a34835e46B93e5FA709",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbf60c09E8DDD7FF9d729d033DdAE75612eCaB98C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x14f0533A441709006390a419799eD44eF56fbB09",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC9c75c6ceE5BEB0FD3da74AFC4ca388c4105a91C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49C55D26F092365af162906AD426986a6472870f",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x864e7Fb99460b085726b2bF20c201FA7974BCAE3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x06bc9B50955F40482E1C7DC9299C1F36245a62cD",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a86E83Aa6B3361483A45fF17a32e1dd8F0f7fF6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdF1d6c8cF19718Dff34B02aC54aDD2793c7f3B15",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2352cB0D5f986d4d33eC27C076f9A4ADa13E7e3c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x90821538FcD66a354E1aca9e899c9eAe8E749E1F",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9C060fbCf9E1A58b402315890682fBF2203e141C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x884D089eaE95da3641C5EEB9Cf67Cb2d1f63b631",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB168aB1AC0793aB4445dfD08867A4aDbCD1EaFab",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44747a9bC4FE988d7BB3e255D8188b079d9cC7Db",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x42d5f24F32fe34D94c230072fe084144675F0d53",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2A433bEC8AF76874029fC5718aBf6A8cCE7Bb224",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA1299aa5A021802BD9c9426772aA943D66a2365B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa89BF84e4b63c8cd8D86a747D24f24A250A874A2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3c4538816768f7bc7A3d521153643552cC983FCA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3599885eE45a7C18981E700358eC9c4BAa48fbA2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A6189cE8e6Ae1c86098af24103CA77D386Ae643",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x6560761ab00d1D110B89a0710d46C683a9b843AA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6Df24F6685a62f791bA337Bf3fF67E91F3D4BC3A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xabc66Fdd1CFEeb7B564eB53Ed76628e26EeDEB23",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x792a9d74a412583C34d0b7A610b20BC84d51823B",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xC0c4ffD15D2Ae355cff821243F07fb5B2B3C7D4B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48A51B9F506462aC48c78c86e72CaE8bc19D09A3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc4326166dFc47AD1FB7e086C0b0BB02987AAad83",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9caA47e99ca5C868aB548a6399621a5068268Aa4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfa22ef75034825a82493336720E456F7aF3ad0Fa",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x373Ce2397E889A751509c2F4A069D4899b90ad87",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x989C99876fb670416EDE77C025f44244558fA941",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x422edB18D7E8855b06ecD0846042D2c7D5D19186",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x524D10e678d91fF1b1971A3d3aCAF330bA1bBD52",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x577528229Fc69Ca5e6ECa869B78B21a7df2f1baA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x43Dd49EDb9983d7672D6e8FcDd49F2C71C9886bc",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xD5e3ce48E3a0606CCE79Ab17CBc80Bd04c1aeec5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFD71Cd085a296aaB5017810eaaA5584931EF082d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3aD354157cC836E01ed07fF9941CAA9F4F445DbE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAa747b5402200B4cb3161b4DB6B98Ee16F962899",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa9C5A97cE35D0Fd8aeeaa035976Bf1F2678196d2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x213DE3994517A65Ef92c7ad4EC9b824dcCCc67f5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x646385323DF30BEB9356677C808Df7A6f87C8e25",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e06Ec39468535a791cE18B8eE1Ca74636B67F19",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb90781Ceb500f80A9c101225eD5451449a3Aa5bc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x93339BD17DbB90BA87cCF08FFD2Ed67b613e8b84",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54735D8666d9e84376c910f2E32A4af79Ee48120",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x97BF2Eb4324b648e7AF52B567914741e6F3BD921",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe91D97aD8EC3dbf20D15Bb4241CA37788e5b5dE7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5d05D702966C821CA923e8A1b0a187a7e1a2a6A2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa993ad31EF46873C0193448dbB2f04C0d3854731",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x220EDF2a786C0F93787EA09Ffa2acF9B94Fdb3b4",
    "0 ETH",
    "No airdrop",
    "0%",
    "1 year"
  ],
  [
    "0xA5Db44e5002D9558a04337f50f9212d5ce715A8A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x18c96DA7542866F85E7e4B77E2D1cAC456a13474",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5eF4072B4416fe1c2B497777a0A08972B4F6FA05",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A4f9ba47C171942f5cd638b259a61f811e3E983",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x295114d3bB03D56F8fc4A1D4688b9d36C12B6351",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x674193A96420C44b9BBa0F7e77D2338850D63D60",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB70f1C82EA26b3c960d4757E7344a07Faa56b09b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x922B0705c47e048E0280F35a4755411b93451bd3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a89Ef3b5a8109d2BF3415dc39fC858CEfdAbb1e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2949cbA7768018080A18234041A4E107a76AB7aB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDBD6bA0c2124a19FfE7d5D768c9E095350Ff89eB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Ddc4233A7D79c7c492db36f5Eb32579DD97e03e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaed1347481b812daDB29c6BACDc55Aa7c21134c6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA2827b4F27A42C3B6E275Db1634A786F1c2a295f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBd18Bd895FE4A9f9751577F6a8Cbd15Fb5367E21",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb0C9708dae79aeE27E37D0EdB8d17218c97E4Cd1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x50a0F15377e9e3E61f9b47019DaA4fdf47901f6C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc14b5b01cce05cb1a938CD32C9777bdf74D7Da5b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x69691cEe9A14DAf0A4D68b06cA57DE4eE867DABf",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa7543f93e682FDf03B073f240723CDB2f306e126",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEEfF525046d07FF5693616D28eCbC14c6586fDDA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x85EB494d60b0808F88a546aD3cE28C805d9CF289",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e7B8e5eB92452926c88681CC55DBd983eb17D49",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd27d90b337717Fd91C4D409F712B890D4eE2FdD6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6e5ba5499bd4BBA442Dc88242F9c7929AD3151eE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5CFde147Ce347f362b4c26Ef489c90a73897907A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x941579a1e5A62Ecb5EBD8aCf3b888fE83bfB71f6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x312Ba6FdeCea1A49b4Aa37ef8b81984Ff69D8BD8",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x643FfE1C01fBFa9877C3b59cFe66Ae41412907B5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x695A38f6B310675f20e1A32b6902F02694180455",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x865D05DDe65c9F73c92ea46A36c8BAacf8Fd22D7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbc0e18F5406ae477C54e4776Ff51f3de0a67A1b7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA5907B0aAd3c055961e2d53f4041AD42979633e4",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6a63fc89ABc7f36E282D80787b7B04Afd6553E71",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A55981f98d823fEF9E7CC2F56F8f771E6d9332f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9cca8dB670a0cFa97BB70dbeFe176ed5Cb13EAD0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF8cB04BfC21ebBc63E7eB49c9f8edF2E97707eE5",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x16Ec346eA64c6259B9cF581fa87324e3772250d7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd7423b7E4A205dd509646CC51952DEDc8553dDC0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x78e80C4837F4b35D3a615198937b4690714943c5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE5e500D5c726Fe768CA583C996e244D0D809A1C9",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2069d9F61b8b19C539188382FEE55cc6e64201bd",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1e7c4a7Ec5eE819c6d1DB0C10015b73832752A41",
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
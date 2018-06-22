
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0xc4326166dFc47AD1FB7e086C0b0BB02987AAad83",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x47811743bB9A3B170ADB8Da4f2727F81fF92D7BA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB7A883569c1D1AafffdBDAb06fE9616CE738a227",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcb55135CFc1a136e8518dB6F5d8ef2C777673F0f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5DFaaAe86278A463f941B79eBEb31F648e3Ee519",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5929157A7b7109052a636332F66caE8B2adA2B72",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0F9fa7E4DaF995F3630f3eFfBbDcFdAE61f5293c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6A552FeF6c7E149dfc093aE0DA582888b842Da76",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x674193A96420C44b9BBa0F7e77D2338850D63D60",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x468d453608A75ebca3da923d8453c240Afb6B7e1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x59eEfBb836CAf79156CFA4557256A05686aB1a8F",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x80a206C0fD7C0eA1BfCC5301afBabcE01738E8e9",
    "10 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7F1E7Eb71574cFDEA195964B3C780F9fF91a3e2C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE8aDA351BCEFCb4474d8930B3Ed982Dfc661A192",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x573aCcFD838Ca460AbfaA95738f5196a0ba5Eb40",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa11Eb84eEb2aE3124a87CFf61C94B0FE0D6135C4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3aD354157cC836E01ed07fF9941CAA9F4F445DbE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf99Ddf96A533af0B77D770AD2407491eE30dF14b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x527673fA6b615F7d3bD4D68f0177f0201D884Cb6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfBf7DC0756a9768D0C71aea5f8421F3b1eaee7d1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfe017fe7cFeDfEa65835d49e1b1f5ECD6E54CebD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC2a8e76A1Ba6078B78B759fE93B2a7fe0D931E35",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x442859652214F2Eba22978d3FD1dC7Ef83ACBeC0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeAd9d9105965C4026794D876820c5cb6d52163e9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x401BA6482685a73cfecd05be339Cc607dDbf9909",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7233E1fb70461404a25401d35880d81EbbEE7E4a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9ca7837BFa03E5191ad003016336d8C9C154acF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA8dA89A88a96E642b8b6b00Cc122EE6045fA9689",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xabbFeFE98940291E7BD6966E43d8454bb06D0816",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb4b96C97141f8EC69B510aB00A8ab0F93a95F16C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD8a56E5d2d0Ef5904acFF63Ab307cBcF4C4846E4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB208C7B6f19d393559d4bc7e3e2ef225285Bd93B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4B0CbC0ce35135C9B1BAb1108C3Da3C3035504CD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6F72D9D38C670ba5176542E12e8699c4BeF2a722",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe7E5c18aA987d8c8a55e610FF39f3fa48d48DD15",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0E152751DaA2A36D9DF94622dCE35C84F1e33E19",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd46f107241BfaB8932E2E9F6cFd07c9c567B7b82",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA7d01405ac2EC04C321274AFDb6E7aB8b739f236",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x869DAaa8257aBBBa3471A909CFa9c728be4D82f4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3ddFAC5f3D920Df8952c891C64Cd1C4a8dD3F2aF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x51545fb33724F6698DF856599Ae10877083f69CB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x875BC71AdF52c48b25E8950C947179846A13aE43",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x771A3c59CBD2Df2E0B5F280AD46c0828Ec309dAA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x179E64f1DD0118e5b1515E62D5933c4C048e8BF6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA2712116f7bAe84018D1c5557e22cf7Ff931e9F1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x96d33b40bf3dfed78CB3B6765f3042636e77bF00",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x70216Dad1da9824aa0dE60Bb8c18A81150150C47",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x524D10e678d91fF1b1971A3d3aCAF330bA1bBD52",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2A1adB594b687FBA4A24040B0a3eeAa4C94f9927",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B2258d4cE92eFBa982D5C2ff54f15ff0CF3AF30",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x20192200371B9942AA116F747DB9dB8E68F9cb02",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf47237C3A332969e688ee53A2aff2bd7646A9451",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6127Dcaed679eD2aFCbd9c88a97B77A91eD8Cd99",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf07d37523bD7cB1a48094e964C3B76E32A1357Bb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8dDDde2F6094ce6b365eb186AAaFE22af3b137F5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc038ad2Fd744B4F9975b800AB48C6b3dAB1757F5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x632aa3b390358BbF0051FEC464497b64CC399217",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x457BA45892A65e56Cf7185d511773df0852Ee996",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x004D3926F87c7F5B2dC52432771B14B572328FcC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa032ED132e504Fea4fe73476915f28b51908eaa8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdf5ea78135845702003e8e5612d74bc094D225a1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x71a3C8da15d871E5208A12d1A6F8d9AE2D7BC395",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7fdF58de18596b9C9309d3dF74A1F67A31ba74a8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x67E6C70B250B970d4b6FFEe620090336AeE69F93",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60D64bA3b0928319Ca32705ecd56d8e8ACA8Fc15",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x216e530ffc9A1aF3fA6E7b14244C2f41104D1CEF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE24dD0c93CFDcF202A855263E0674C9Af1C00794",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32E8339Bb76884de9545b0d4E94ed0CC736d1Fe6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe5735B8cD23BF269296fD86B2dC799AD940b081f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3815EFC4823479D9C72982A1F2E9b160320C8544",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x320297270E204e5D8037e034445947064286ffe7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2E525DB2e77932eCAC74713D66173544fea32848",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6c2AD31D3c6f2D179C43C58cED5EAEE74a23b54F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb334F5E890C0a4211777A876562E33c915230C9a",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x91cB962347171C4459A1d6A1e87074DA9da417A4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32e4238dD1DfDbF131f4B77b1084664c47668530",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7dCa277D5d3FfF7C522Db08a7926246fb3A103bA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31CDf9058b476B2F2B8234A5A355991cF1762608",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcEc427C21986Cd6448B42FCf0016cE2a9401Ff59",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8D38C81B7bE9Dbe7440D66B92d4EF529806baAE7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x401515fEE4B494edD710B1bb5232Cfe813babff9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34eBDECF005659aadc2e4eb3d4cd1e9DDA75922e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x158964CF45c9C56Ab57e4a7Be19F023D6D3f9b32",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x241f6840DaaD2a2B6A7fA9948be5C289af668A49",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34d53c8eCF31bda3AE3b8f192009df887267872C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1383CAcEabA6B7E98dD490Ad88A14b888D65B5e9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x797Dbc2fFC7f56B3EF35beD4B40c61F89Eb6E4f5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3f3db23880c40f1a058cC821a7838Fe97b4d29f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x30e26727cB1904FB30D36e0545DaDaF57024Ef1f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x128d0fD0C33B12c206C5856c75C85ddabC4126fC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb2abeE613475fa803206Ffac9B90c663D760ca4E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73Ef86Ea7f3E372BA000ff4e24899b0D5963e821",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc2C76F1cf7958Bee40804A62470Fa676b36C2435",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xab303495f3Ace0759dDEF4eeC57ea8a18eCa2D27",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB3B34C9Bf2a7E4064eb6AD7bDAad9b079642883f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8A0F770625F4bf4529BF6BC679854d738C3FB24b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB99E3f962E2442BD5ec19Bd9e7EE29160418cC36",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB88F49E85086a668FfF395578355812883E865dF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3ba1f2694e6217B606eFCa098ad31b5fB35841AC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x06234C3431Eb786c170272c75903B079c1D88fcB",
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
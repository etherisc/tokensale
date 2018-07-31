
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x88696C4985f64Ea1EBfb9E46c1B47197F7a244AB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4dC2Ac2152337dF28113f54688bE53e7AEeE8188",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBd5629FB3a825f4E1CD53077979AbBB147ED3898",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x447eE09F94cac39D9cbB184819368f3B55eee4e9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x897F21219228922ccDE899cD79b55E03de0c9DF1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa4cAaC1D3e9e54fed859FE29DddA2dB5326f9BA1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAF660979107fda019b41cda0D3AD3760Ba22707f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x202c29dD21420c6b6d42ADfA55B19c3e8aE28774",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb386B3370F3C258d241fED394050d60F7c421bE7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7ecC195AE4c2a628B510758ED85D0Cf068b3aDA9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x74fD854d8daad8fFF0E0960Ac77694BfA356c5b6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x59fCdd1e59C3e6CaEc00b282930aafC52C84067C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x778D849C9Ba698314935a1836c455BB7bc28B3d5",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xb6AffC9a655Cb074a1d544dc906FdF4811C4d795",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4821EcAe20050B6C28E59732931Bcc5CF1567AE5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC534CAFac4405402Fdba3C253aC930F0451A9e59",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3550d46C8535E9311f106f4820De4B9d7dE66bFd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA7C799C7Ca2882CcC48BDE442404f112e6DC3094",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xf24b2e415C970D768d1D689e546A9cd58Cf8115F",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x1383CAcEabA6B7E98dD490Ad88A14b888D65B5e9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc77CB81a0b126cfCf82A8965Fbe27C2F3595bf82",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf47237C3A332969e688ee53A2aff2bd7646A9451",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD522f84DBF280c277F375DC969ceC308cF894E33",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28876CA4e02851947997B5529ec99D42fA5d27c8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x11cfCdcF47Afc12a9DEA49e96b55E66C00f384ac",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9ca7837BFa03E5191ad003016336d8C9C154acF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x398c901146F569Bf5FCd70375311eFa02E119aF8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB6a04548e22c1B61eB73905C4F111c171Ce8d239",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb4b96C97141f8EC69B510aB00A8ab0F93a95F16C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC28993B1d5F80b1dDCbc8e83Ec8C8765e6A8CF4a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3b38DF411221126688b7CA4Cd3B5C08144E558E5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC934A61Db75E740025FCea5c90300cA42f152105",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd343c3efCBBf2EBb47C84495027791207B5659bf",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5CE1336f4d714766452Da9BEDf55DeF65f2F66a1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8B91C0Dd24C4Fd4F973e49ED8568921e31CF38b7",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x86a14456bDb041c1ca0D6F8C0e6d4857e012902a",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x59eEfBb836CAf79156CFA4557256A05686aB1a8F",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x7Be682bEB239AEEc32d222e266a008C6AD961683",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34A45b78118e2E0508b5908DA5E355848682E338",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x93b6bFd98045C2EE83B187212a56dB72dB215F6E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0039e762ECd8e8F074e93575dc395aBFCe4ef8b6",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB81d1213E36DFa7843bBfA8D77b935Ae833D8A83",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x70FbA1b46B513EB32bc9C5Af243cCAef8Ce73C64",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0e2ddC691eA3c442668d7e801940223E95f9c41",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xbfC1E256842c99Eed8db16294974a66F7Ab5Ea89",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x87E80Eda1d03c895e4C6dAAfB7A19f755c64D9F8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x66f9d60F50b016e05EF315814BaB731615d0f631",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8d11Da7b584C9901Cf8Dd401e4B34e73a0520585",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD1ca6945A6c280920fc2AA3D38E8529937Df6dd5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2a8E9bFe797Bf1aD378562947E14F7Edc6D4499e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC6339d36BaBB52F4500519DD7cC95171b18e278E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1C33ba6696C9E8740697aC81585A90194C5e7a20",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD0B1F4b75d0649b23ff9ea9e3068AFe9EfC28AF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6eb91d2bB1e4ce166621F0de95474868e75653a2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2FfC680875818Fd9e0A6Ae43D26720d6B17ffA51",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb71D05cF5CdF7a9B15B20b9aaB5E91332C271c96",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe7E5c18aA987d8c8a55e610FF39f3fa48d48DD15",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xbacc3f67078b27E72d1fC082EEfc5554c1bF540e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4ba05Cb5b7e235B3E3d28EeA57632ADe181E3E96",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13a86449686ff27A905ebB31b38E584168893Ccc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x10e26A47ef2179e3126924d6f4754C99c897d311",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2eF89cc67dfeF7e7d1db6108A1dab6f7451E2c49",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE054BC6dcb66EC778BAae1Fc05979aBe426c574e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x740e8D1D732306cafFd7717633e36AA49773f511",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9272c09a4c0d37A050c7F97cE2BA485fFEE18943",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x389Fd36aDe499b71da9FD651D092e6a167eb3cEc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe7BFc2D67D621812FBccefBB56afa1d258cA9748",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x437A0741786462e66Ca0a3143407692f22f65312",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa34f16c747E7eb21a32C28bDe173c2fB099C70A1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcEc427C21986Cd6448B42FCf0016cE2a9401Ff59",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a950257cec01575931E37e9DB54Ef610E92837c",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xC6c3f2c7180c6B0bfb49405D6B67411100E9976C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa090aC08f3C59AEe3B1222318B3dac8Ab4841433",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xECe3f187923C0CF4a5d2bc0713FccdB769DF1985",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8EF3D577898623d8f6DcD40d21264ae9C9B58AB9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd46f107241BfaB8932E2E9F6cFd07c9c567B7b82",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x938caAE22ea8157C38233346Fee0F095116837E3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD912F766b41b0594571af0188b92795bF3c0f710",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xADBc69b07B839CA353177B5A22013B30624D2dC5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x136Cf48DefAE1675856bC90CC522C678bD6b8334",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe6D1F4774a4144B3F08897982CD8dF5C05EcCeF5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB85C4Bc649746192AE21E78696CEd76500221d69",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x68ede3270A66e302c0cAee05Fb829b871B13Bdf0",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x002848284eB655a5a99250fFbB09605B8e624261",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x89eCCEEc77B11172382d452217E9ef635c013275",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x9Ce8d776E99Ad38220eA387592f5f0642f4A1e2E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28BcD7D3f03a0f5eF0d8eC0397FBCC29181B1929",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3f3db23880c40f1a058cC821a7838Fe97b4d29f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0beCd35b35Af267955A881123018Cf5A75598f5d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3f1665C1f556c82b1168e0F478B25f709FaF72c1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x527673fA6b615F7d3bD4D68f0177f0201D884Cb6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe5735B8cD23BF269296fD86B2dC799AD940b081f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc2C76F1cf7958Bee40804A62470Fa676b36C2435",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB88F49E85086a668FfF395578355812883E865dF",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7d000f237d74313038Fe7D0669a9B8C4f225727b",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x5BBF3bB0CDE46E32133bd23859F726062d4339FB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAb4819F0666D5156A0FcB8548af56Ee95A6768fd",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2bec5686AdD6DCF50eA868f496981e3CE90caE6A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x726399aB074fF02d56E241f887224E26AeE6221F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEe85Ae5daAb560731243403f56C51654dEF8bc6E",
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
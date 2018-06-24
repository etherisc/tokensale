
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x40B3946d34a6b67E65fb00Bf19cb92cE0C3E3AEF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x47855a1a80f5881F41dfca03dF748A59A331A093",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBEB1FD865fEEa5006c74Bcb615Ebb00F1a05d469",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x4936d59F7F33585606A763c02307c4f78E7362fb",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9622e4A1aFE259C7f5b76c246881B28acec73b3e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6799Ca07abA8180Eda4000C027753537D78f8430",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60a4e810F4b293206A299f980D9CDd323DEdf228",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb525F6b3b5EFCC0C54582de2F08D890F7793e3e4",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2e2f2B688Ec2fCb48742DF66F436C5eC5AA425B3",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x06bc9B50955F40482E1C7DC9299C1F36245a62cD",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x88696C4985f64Ea1EBfb9E46c1B47197F7a244AB",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb71D05cF5CdF7a9B15B20b9aaB5E91332C271c96",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73181A905ef01480CC19286b48E0991488d62ec8",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbe466E1e0b4eE491a88E650aA6b9aDdc38Ff6f8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd3AE1F25077A62Fe9E38f8675F0bE5B8e79e827d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2c85c8d5f504199a27384C271530e978F35C47ce",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xF4a4E11d8fC26406fF6aa20c74b17544903B09f6",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0ee1Bd3BafB0a7B01dF1d3572AFc882cfba4A718",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x0960Da039bb8151cacfeF620476e8bAf34Bd9565",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBe87c5bEAd75a079f5593D0a3AF9099F777D7526",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe8Da3052ca4e595b0D147aCCb1Ef9bad3cdfeA54",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xf03B12bCe93593be3a5310e281eb800eBbC90191",
    "87.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC0B374f27abcCD5f34e30bA437AdF10f084a66c4",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x44747a9bC4FE988d7BB3e255D8188b079d9cC7Db",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1c8abF3790eE489b75e653e1cED91EBEdC52Feae",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB16BD558262637055C54787558fE8669694807fA",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB531670efae115f7DED0A9A850C6D43F638f8777",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x67cA73911aB8183F427064d174E24f521BfAab85",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDE4D5886da98C3A1140260aaF536a2f1262E2948",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBf469B493F33550c05cC418815A42f8142996f52",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdEB49B1cf2D98283153D3f0aAC98de66B863c6DE",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x857BDbB885B7E5A735f4bf27D294A4cF340Db587",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a950257cec01575931E37e9DB54Ef610E92837c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x77a1438B1337EB3432fE02819Df235771a1346df",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2E91F7e44eeE5502FFF4A30F04fDAc55c4BdCe72",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB2F6bC13aaa8ADfcbBb6Cb3f85F8B87073Ba2aa9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4E09C457305C326684E48e79498cf8Fb4988cde",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x32eCB5Aebada66175fC5e00a44c0c4040002fD7f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf6dEda468Ba0afF0948bF96e17386DF5cA642Ae9",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd0965AC6C6576726c07c62807e6Cf6F2F8aFF6B1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4556a59d1E487ce9F062A6faA1381ee0Db859Fe0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x776CE1f4CeeC8CA50F55457D4BcBaE2f52a23731",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6560761ab00d1D110B89a0710d46C683a9b843AA",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDEFCE9456A09016b281579924057cd6dCdF2Eb52",
    "62.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48A51B9F506462aC48c78c86e72CaE8bc19D09A3",
    "87.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22d156f4fDAe315957Bc955510E3918241caF571",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9F9f62b3cf6BD149bb8aEd70A123745621EF9b26",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3f1665C1f556c82b1168e0F478B25f709FaF72c1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD67C1a612425C03ef5A29A64B6c1E58620015C23",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xaACC5D601E74eb7d7a55d0F27bde1719c28DD653",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0531d6115134cA7e2DDCf256CeC6e6216D7fd8f2",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2B8b2Bfa75a41DFB57d08E8E187F52c5C28B7095",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x800c443D4fC0048D2f4a83d64CDEc93a824BE745",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8E763c3c5361777fC3Ec5F377e9BEa26CBc65366",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd27d90b337717Fd91C4D409F712B890D4eE2FdD6",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x433d7aC55Dd0662d0535ca763E67bA096e7188cc",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xFd03e76aFA140F442a1B3eaF7b9Af1461f61b59C",
    "87.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5F31f44484AF691E513a3793d45BBf3ea9c51793",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x54735D8666d9e84376c910f2E32A4af79Ee48120",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xE0097b155456e6390e0b05F96974E20A243836F1",
    "87.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x21F070eC7A30ca959a6f1691f270C66341d31396",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31D04A32F22022Ec66AfE6C2351db768ed32B873",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x93339BD17DbB90BA87cCF08FFD2Ed67b613e8b84",
    "75 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeBFf84BBEf423071e604c361bba677F5593deF4e",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1540c64E56E61E144EbC701C1ECA6feF23423E85",
    "87.5 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x97BF2Eb4324b648e7AF52B567914741e6F3BD921",
    "100 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9e85c752Bfd62F4fD26C7a10aB23f4B7c008f9F1",
    "300 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x424798d74557A4Be6Fa1B7CD3344093DF10bb075",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x88985316547625E1C1B80f0850803296ecf5e87D",
    "100 ETH",
    "No airdrop",
    "25%",
    "1 year"
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
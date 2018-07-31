
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x94b5B77e7cEd2AB7D6eff1D7AF04db0a4e2C6DDf",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34a77C221Dee2464290a5A5E03b1F21dA6Ef2ceC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2Cc7097A5f5231E7c94AEe8CCADaFb3e06A04C52",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xAcEB019aDb386a823Db77986C2D58838a3aBeb6D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xda74E197B03415a7DC1D0567490Ab0f72d52348E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9622e4A1aFE259C7f5b76c246881B28acec73b3e",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x860a92da28592bDDFc94761dcD21969345D16A5d",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6580EFF8FD09f3eBc2ae7AbE6eF775D9c7aD7728",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x857BDbB885B7E5A735f4bf27D294A4cF340Db587",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B6945E8eC31769de439F55a3032cBD5fC452527",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xd359a9583175750b6e10c3C1bf15ac3aA8A9beB9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7276846B1DC5b8Ed675122eDa1679d5D17904cd6",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x73181A905ef01480CC19286b48E0991488d62ec8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x871b234fC63523D45def3b8F1753C2cF7975e830",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0387DB4cc6D8C6d330425769e477355144d4EB16",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF3478375683Aa1e89a867E23A60483A5cfb51c74",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3906842E00abf96cc58300BeC49124e6A36a46DB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7B199FAf7611421A02A913EAF3d150E359718C2B",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8a1801d8052607C46D3e221ebCA0aD20fC8464F2",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBc7eB48A8c2B01B3cbBCac663863004c6170dEf1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Bf9e7017f9c71Ec64a17f3a9d9a79Db7Da911B3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD3FEe15681c13Df141e3E9F7F83213E73646026c",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x47811743bB9A3B170ADB8Da4f2727F81fF92D7BA",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdD3E49C138D4cd1B016C83BdE71c3689c4331CEE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC2a8e76A1Ba6078B78B759fE93B2a7fe0D931E35",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x84314Abed819BCaA29530dfb50cE36bA6B6d1B39",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x16171143b27094AC17dB67808e728B7Be99D9422",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6C9B0dC29109ED37F25332B3b68A213657d8ded0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x616e19c701bAa2ED883eaa59BF92808A29199e48",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDc9410dEf289E92Cc9Dc13d1ee51d2bF820E0B3E",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0e6CFf9f61939b18319e6E5aA02E45B5Cd9Edb94",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x312bb0FD25fea8Fd6da8FAb80c36152975833a55",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xd4E09C457305C326684E48e79498cf8Fb4988cde",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBc7b9FC2CB2d00fDE719E67b35b323ce97c9135b",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x26B2cF9966b1B175B0506C3e25Ac76960aCf52cf",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xa73Af3c91a2ed1570A35f9A3eDd5AE4fE71e1dB9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x685CCEaBE623A2e001dd23312dA2A98c18181835",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE861d66727DB7C3920D3F809D0106E19B45f99D3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbf9ebc6082d62194F3Cf99A303Da134587e900D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0024df2bE7524b132Ced68Ca2906eD1D9CdAbDA4",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x005B84174E22C679a7707828f19E44a4dBe73d29",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x53c848621bCb795aAdc7884c52F5aDB41E426C7F",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5dD7Ce6cdcF5c6CC73BD162Bc1218eDCBAea36b5",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x2993E1D02b11377f44455AEdc618C705acbb0591",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x50f6bA1c731Ac40b7529ad6A99E3e039C8F4508c",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcb55135CFc1a136e8518dB6F5d8ef2C777673F0f",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x65755c9Cd95c84731fea609021eCBbe410753719",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa56905783d22eB52a53Bea5A24121F9aA89516F7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfeDAE5642668f8636A11987Ff386bfd215F942EE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA2712116f7bAe84018D1c5557e22cf7Ff931e9F1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5CC9ECDFFb501cf5A806868e6f042f9d4F6C6103",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x128d0fD0C33B12c206C5856c75C85ddabC4126fC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF9DEb6f9C15B5B7Ab3D05377E12fbAb6418EBeC8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x004D3926F87c7F5B2dC52432771B14B572328FcC",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCc426402362B6B2B0bdE6791025C188c09f04d31",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3C128564719472e27a8CbB5D90c3e41d9F9f70A5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x85cF050Acdc58dCCc912720de49507643E86BCEe",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x000B40251A19DC2374ce870e67635B4185e0fE28",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x06234C3431Eb786c170272c75903B079c1D88fcB",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xcF64eEE704597156D0f39Db7c478331484cD6966",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7890339db591b78656C20D03D81FFE89B5B1b84C",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCc2aF63b39a0817f7fd93Ab604873FF0C63577d0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xeFAdEF57a9620c525Dbd9B12fA286B205feCe1dc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3Ca65E58DCC5608973f6C6654def068698B44C10",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4A3151F431E60D0E097cE0f8aA492633826bc441",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x12dAeA3EC72F822C6f4790Cc037775F4af64F872",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2056730C7dCCF36A64F4C785e69b177Ef3c3d0F3",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x546a0cB802377153B4fEAe052a5ed14C98B3CC9C",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xf03B12bCe93593be3a5310e281eb800eBbC90191",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa1bC11f8fD045a64f934512377AFba2f7bea8C07",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBCDe673E7Aa4eFc0892C0A796750506DFc802093",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x033E2a2d855e19dd3edcA18B4CD88C422FdD6A38",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1E6d8be98d672939D2Ef991b69d320c84F8FE841",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x31CDf9058b476B2F2B8234A5A355991cF1762608",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD2Dc23588F3A9aCE1f817c17c383Bc01F3F4b0f4",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xB2FB5AEFF173265ec147E126134D277f280E96fE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x33731945cAAce26e78Cce37FC803a62f2A13daEE",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3907f2cBaCcE596467D23F06D75CaDb2b5bd36b5",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1B1862c4Ff51dC53Ee9CB7C3468fc87530eCbdC7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCC3FeadB5C942a0CeBD3F221C5cA89789C6536A9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x67E6C70B250B970d4b6FFEe620090336AeE69F93",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xE9cCf419b3E70a18160Dc1A98870430937AEa72A",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0960Da039bb8151cacfeF620476e8bAf34Bd9565",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x49E3Ecea346677CeBbB0eb007ABd1006D843CeEc",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x17a985dBC716F06E99c6C3fA38f452C21C8835F0",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfE5D6AB434227d0AC52CcB2374449AEeF509f02D",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0x90AAB51a7f859E9D6534D5fA7BeCF217039FbF3D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB2F6bC13aaa8ADfcbBb6Cb3f85F8B87073Ba2aa9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x88a8d8A13A69A182004Dfa8Dc680BEE75Df4BDA5",
    "0 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xe9E9f2d506D9d66a7B07e4F86900286991Fe6d89",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5929157A7b7109052a636332F66caE8B2adA2B72",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdbe466E1e0b4eE491a88E650aA6b9aDdc38Ff6f8",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x537830A9070fF3Ff5dEc709DDEBaAF118215E7Ce",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xddb52Cf39a7E3Fdaa0AFfEC4D35EfF4E54Bfd780",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1A8f085e817C4a89F443cB6aB05bEDBbf240694D",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x6B6fE7C02DA9aa2510c1B17b13e31cBAF326C802",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7Bb827BCebe8dfCB4672dB29dc767aaf151EB3a1",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8D38C81B7bE9Dbe7440D66B92d4EF529806baAE7",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc5C84D08f5C818B067E0981AB3Fd81F7973C98b9",
    "0 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x008dd1B21dad14A42715A406F36abC940Ebf0287",
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
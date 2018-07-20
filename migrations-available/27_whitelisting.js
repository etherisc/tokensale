
const toWei = require('../util/toWei');

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Data
        const whitelist = [
  [
    "0x3576f71d9fC9026f545d1cCDF38D6ebf4963E597",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xA3765D4449f54ce6690F3be4b91DF48F7130790D",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xf57FE59F0f2e72b65E34CA5C4937Cf04a140aC35",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x891B775a08Da27995a8DEBc25c38ac08430cDE97",
    "50 ETH",
    "No airdrop",
    "25%",
    "1 year"
  ],
  [
    "0xd087E6927B37937530F2CA4Fdad203A5EE6Eae37",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb8fB09eA3F982b62639Bea48D58B2CCf8C00D92F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB81d1213E36DFa7843bBfA8D77b935Ae833D8A83",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1B1862c4Ff51dC53Ee9CB7C3468fc87530eCbdC7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xdF1d6c8cF19718Dff34B02aC54aDD2793c7f3B15",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCD0B1F4b75d0649b23ff9ea9e3068AFe9EfC28AF",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x008dd1B21dad14A42715A406F36abC940Ebf0287",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc9b690a2e3667AB5337B9dcBc8b62Ff27bE4e7A3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x0FF96d29D25E31C4ac2A3Ab46bA1a27B0b3A9C5f",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x989C99876fb670416EDE77C025f44244558fA941",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x68568055914bD2C75cfECa448cb08220ae9c9e5C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x562E5C553A3DB3d725affC3AffA8EbF4014cE1AD",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x00AF0Aa8e138Ef7741000072aF92867B63668FbC",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x504C2ba98C6C17D526Ebe073218910f7f27EE51e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x25BDabB2Ee6a8081F1D2C26Bec0dc81a3244bBA7",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7c2Fd381eaa7e627A832f98C01d7A37393FD010b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xfB8B3D001783385a098C334faE740b61AD42460e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x7a845513362D9389be89eEf866Cb8A2bE57A386F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5A4f9ba47C171942f5cd638b259a61f811e3E983",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1d3faFFDd38d407752A1931B8815DA6260e4Fe02",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x75fbf90238595c486Cb8186553134DB074b4E34F",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2A433bEC8AF76874029fC5718aBf6A8cCE7Bb224",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x22Fa0d9dc1482Ab8d652df8b96aC48ceB283a15c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB26b0016eB1A62F64f2EAa4BEb2D7579986C1C86",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb1BC9E96f3D596C095Db9980a09ffD3042207dAb",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5e911f7448FD9389eDa8B3C850ABe1B76C7BFB0d",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEFB4170241bdC2F264978509C500553E04785828",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xDBD6bA0c2124a19FfE7d5D768c9E095350Ff89eB",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xEe85Ae5daAb560731243403f56C51654dEF8bc6E",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x13d62D5A1963046A3caCcc3097a4576D1f9b42e1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xBd7a16507BcD0E13a558016B170a42034F0d5Aec",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xe150C83Df04aac2e176beA805CdFdF5e85441AC0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8d3Ccda02E3D205cB50e604197aC84deB2f53e24",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x56B0512c3cef8cf90B3f09fBc0578F04492cFFE1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xECe3f187923C0CF4a5d2bc0713FccdB769DF1985",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x36755A3ae86A366E2c5cCD1dD7437A3CBE9d09F6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x1934B3d5d8853fc6CE62DA4B25B055787739fe29",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x34d4ECD77D6378EbddA1C62A38881E4587109181",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xC0c4ffD15D2Ae355cff821243F07fb5B2B3C7D4B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x220EDF2a786C0F93787EA09Ffa2acF9B94Fdb3b4",
    "50 ETH",
    "No airdrop",
    "0%",
    "1 year"
  ],
  [
    "0x7e8f4C3324Bb4B94E4a24de7AC91c236c4E26676",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xCaD4d3bD732F7956A5Cd932cda85F22334D28dA6",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4B6B894019D33db89B7Ec5570bD038A301aFE91A",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x48A6216F5736502bB3eeDE3416E8195e4d344ec2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD5e3ce48E3a0606CCE79Ab17CBc80Bd04c1aeec5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8C11e07F6EAF24396B695720131B87b34C082A4C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x458f14497244E14f27AA4ACFbCE267246970049e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x99bf9D13581eb1c3051B9863216c23558B4f044b",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x82DEA6e139657092BC51c4dA24dd1d08e4B1C383",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x74d73e9F80A7FcC4E2d1eDF67579B2D8336E0A33",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa4cAaC1D3e9e54fed859FE29DddA2dB5326f9BA1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x27cEEc2bc71BA4E45DA31Aa48F9d25D113DB3cD5",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xabc66Fdd1CFEeb7B564eB53Ed76628e26EeDEB23",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD77a6064223a59b5793c92203f2504CAE1000670",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x8A31EEAc24FAF8cC29FA11B6387950a68ADE8C72",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x185D33C0376E25D1b820932cc857D7191DfE3753",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xb30b3cAA83A1f5092FdD5103E6ced693dFef3b8B",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x75d8461671AB9D610c84e52b7A2438cCf96BdB89",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x165D461d3812B57Fba59C2a69BF294fB4A7a5Ef3",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x35FD75652169735AFAA29011A7D3f650BC2D5A5e",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x3193d924C0F0CaE6D51ca31c847CC412E1B4a610",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x84E13BA3e77e5fE0b9209ED335Ae9054eFe5A8c1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x29146C9632cB40ce889237537E721E9132818D18",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x9105b9714Dadd4cD549122Ec465Be0A5a0B227b4",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x89bf7C96BE394d3bd7ef216072343557DD93EA2C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x60D38778ADbBeeAc88f741B833cbB9877228EEa0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xD0EBC25b3b492a6DD7C8aEF9aAbB1502b8242F07",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x2d92214855f88f1a3f24B1A3f8F6d533CD0e2E37",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc47C291ECE9319CF5acF74704DC816a2cE14A407",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x4e3E70B0019FE1ab82ed4EfD53d0C78EB7E072C1",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x86C204Cc6857f820760b241686C2abd7319944c8",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x61bd0594E0b02Ebb679F1763684CaD2c1c4F29aA",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xF1f3c1dABC95a6034c75006D13EFfeEc686Ab428",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa6B16783152978A88efd9c4f51355978341D131C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x28a32a02163728685f8EC11c94F4CA9C01E175D2",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x15ffC8C3E3AD31562746a21f4F7E5ca45307C52C",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xc156F36C608B610c0353a8C49DFcECf9379D784c",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x05291f641D4bC612Ee644cD41601bD4D6cFe17A0",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xB9cF7DF3eC3A48AA792dE6A94a7d735454Af19df",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0x5Fdf5c0009f5ed80bBe811b39ee5bdA503034301",
    "50 ETH",
    "No airdrop",
    "0%",
    "No lockup"
  ],
  [
    "0xa9C5A97cE35D0Fd8aeeaa035976Bf1F2678196d2",
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
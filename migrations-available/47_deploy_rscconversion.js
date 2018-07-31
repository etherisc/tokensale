const RSCConversion = artifacts.require('../contracts/rscconversion/RSCConversion.sol');


module.exports = deployer =>
    deployer.then(async () => {

        const DIP_TOKEN = '0xc719d010B63E5bbF2C0551872CD5316ED26AcD83';
        const DIP_TGE = '0x00391d08B3E68E476a774aDA379258264EB74485';
        const RSC_TOKEN = '0x9B0F6a5a667CB92aF0cd15DbE90E764e32f69e77';
        const DIP_POOL = '0xEDd98e9b2eD1c2F0F5539f3e50Ffb8e37ce125d1';

        await RSCConversion.new(
            DIP_TOKEN,
            DIP_TGE,
            RSC_TOKEN,
            DIP_POOL
        );

    });

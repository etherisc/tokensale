const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');


module.exports = deployer =>
    deployer.then(async () => {

        const DIP_POOL = '0x36500E8366b0477fe68842271Efb1Bb31D9a102B';

        const tge = await DipTge.deployed();

        // Airdrop for DIP_POOL
        await tge.airdropFor(DIP_POOL);

    });

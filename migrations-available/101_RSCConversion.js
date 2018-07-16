const RSCConversion = artifacts.require('../contracts/rscconversion/RSCConversion');
const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');
const RSCToken = artifacts.require('../contracts/rscconversion/DSTContract');
const DipToken = artifacts.require('../contracts/token/DipToken');


module.exports = (deployer, network, accounts) => deployer.then(async () => {

    const crowdsale = await DipTge.deployed();
    const dipTokenAddress = await crowdsale.token();
    const dipTge = crowdsale.address;
    const { address: rscTokenAddress, } = await RSCToken.deployed();
    const dipPool = accounts[1];
    const RSCConversionInstance = await deployer.deploy(RSCConversion, dipTokenAddress, dipTge, rscTokenAddress, dipPool);
    await RSCToken.at(rscTokenAddress).approve(RSCConversionInstance.address, 123000);
    await crowdsale.unpauseToken();
    await DipToken.at(dipTokenAddress).approve(RSCConversionInstance.address, 456000, { from: accounts[1], });

    await RSCConversionInstance.convert(100);

});

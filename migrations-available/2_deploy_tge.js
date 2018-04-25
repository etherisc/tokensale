const moment = require('moment');
const toWei = require('../util/toWei');


const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = deployer =>
    deployer.then(async () => {

        const crowdsale = {
            wallet: '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
            rate: 1000000,
            hardCap1: toWei(1000),
            hardCap2: toWei(2000),
            startTime: moment().add(1, 'minute').unix(),
            startOpenPpTime: moment().add(1, 'week').unix(),
            startPublicTime: moment().add(2, 'weeks').unix(),
            endTime: moment().add(3, 'weeks').unix(),
        };

        await deployer.deploy(
            DipTge,
            crowdsale.startTime,
            crowdsale.startOpenPpTime,
            crowdsale.startPublicTime,
            crowdsale.endTime,
            crowdsale.hardCap1,
            crowdsale.hardCap2,
            crowdsale.rate,
            crowdsale.wallet
        );

        const tge = await DipTge.deployed();
        const tokenAddress = await tge.token();

        console.log(`Token address: ${tokenAddress}`);
    });

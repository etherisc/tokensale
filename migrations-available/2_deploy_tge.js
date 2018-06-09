const moment = require('moment');
const toWei = require('../util/toWei');


const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');


module.exports = deployer =>
    deployer.then(async () => {

        const crowdsale = {
            startTime: moment().add(1, 'minute').unix(),
            startOpenPpTime: moment().add(1, 'week').unix(),
            endTime: moment().add(3, 'weeks').unix(),
            lockInTime1: moment().add(1, 'year').unix(),
            lockInTime2: moment().add(2, 'year').unix(),
            hardCap: toWei(2000),
            rate: 1000000,
            wallet: '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
            rscToken: '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
        };

        await deployer.deploy(
            DipTge,
            crowdsale.startTime,
            crowdsale.startOpenPpTime,
            crowdsale.endTime,
            crowdsale.lockInTime1,
            crowdsale.lockInTime2,
            crowdsale.hardCap,
            crowdsale.rate,
            crowdsale.wallet,
            crowdsale.rscToken
        );

        const tge = await DipTge.deployed();
        const tokenAddress = await tge.token();

        console.log(`DIP Token address: ${tokenAddress}`);
    });

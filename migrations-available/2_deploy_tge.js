const moment = require('moment');
const toWei = require('../util/toWei');


const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');
/*
$ node
> date = new Date(1529938800000)
2018-06-25T15:00:00.000Z
> date = new Date(1530370800000)
2018-06-30T15:00:00.000Z
> date = new Date(1532358000000)
2018-07-23T15:00:00.000Z
> date = new Date(1563894000000)
2019-07-23T15:00:00.000Z
> date = new Date(1595516400000)
2020-07-23T15:00:00.000Z
 */

module.exports = deployer =>
    deployer.then(async () => {

        const crowdsale = {
            startTime:          1529938800, // 2018-06-25T15:00:00.000Z
            startOpenPpTime:    1530370800, // 2018-06-30T15:00:00.000Z
            endTime:            1532358000, // 2018-07-23T15:00:00.000Z
            lockInTime1:        1563894000, // 2019-07-23T15:00:00.000Z
            lockInTime2:        1595516400, // 2020-07-23T15:00:00.000Z
            hardCap:            toWei(60000),
            rate:               5000,
            wallet:             '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
            rscToken:           '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
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

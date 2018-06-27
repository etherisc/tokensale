const moment = require('moment');
const toWei = require('../util/toWei');


const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');


module.exports = (deployer, network, accounts) =>
    deployer.then(async () => {

        let crowdsale;

        if (network === 'mainnet') {

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

            crowdsale = {
                startTime:          1529938800, // 2018-06-25T15:00:00.000Z
                startOpenPpTime:    1530370800, // 2018-06-30T15:00:00.000Z
                endTime:            1532358000, // 2018-07-23T15:00:00.000Z
                lockInTime1:        1563894000, // 2019-07-23T15:00:00.000Z
                lockInTime2:        1595516400, // 2020-07-23T15:00:00.000Z
                hardCap:            toWei(60000),
                rate:               5000,
                wallet:             '0x5c3095c53743b8857d6e1d107e5014cdc7b44efc'
            };
        } else {
            crowdsale = {
                startTime: moment().add(1, 'minute').unix(),
                startOpenPpTime: moment().add(1, 'week').unix(),
                endTime: moment().add(3, 'weeks').unix(),
                lockInTime1: moment().add(1, 'year').unix(),
                lockInTime2: moment().add(2, 'year').unix(),
                hardCap: toWei(2000),
                rate: 1000000,
                wallet: accounts[0],
            };
        }

        await deployer.deploy(
            DipTge,
            crowdsale.startTime,
            crowdsale.startOpenPpTime,
            crowdsale.endTime,
            crowdsale.lockInTime1,
            crowdsale.lockInTime2,
            crowdsale.hardCap,
            crowdsale.rate,
            crowdsale.wallet
        );

        const tge = await DipTge.deployed();
        const tokenAddress = await tge.token();

        console.log(`DIP Token address: ${tokenAddress}`);
    });

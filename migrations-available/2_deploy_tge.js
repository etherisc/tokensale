const moment = require('moment');
const Web3 = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7447'));
const ether = n => new web3.BigNumber(web3.toWei(n, 'ether'));

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = deployer => {
    const crowdsale = {
        wallet: '0x14be1f9cd06d3f349eb6d8cf7de951684473259f',
        rate: 1000000,
        hardCap1: ether(1000),
        hardCap2: ether(2000),
        startTime: moment().add(1, 'day').unix(),
        startOpenPpTime: moment().add(1, 'week').unix(),
        startPublicTime: moment().add(2, 'weeks').unix(),
        endTime: moment().add(3, 'weeks').unix(),
    };

    deployer.deploy(
        DipTge,
        crowdsale.startTime,
        crowdsale.startOpenPpTime,
        crowdsale.startPublicTime,
        crowdsale.endTime,
        crowdsale.hardCap1,
        crowdsale.hardCap2,
        crowdsale.rate,
        crowdsale.wallet,
    );
};

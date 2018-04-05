const Web3 = require('web3');
const fs = require('fs');

const getFromCsv = (filepath) => {
    const whitelist = [];
    const fileContents = fs.readFileSync(filepath);
    const lines = fileContents.toString().split('\n');

    for (let i = 0; i < lines.length; i += 1) {
        whitelist.push(lines[i].toString().split(','));
    }

    return whitelist;
};

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7447'));
const ether = n => new web3.BigNumber(web3.toWei(n, 'ether'));

const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Example 1
        const whitelist = [
            ['0x8EbCA32BD42D86EE51F762e968667e40b612b6f1', 10],
        ];

        // or example 2
        // const whitelist = getFromCsv('./whitelist.csv');

        const investors = whitelist.map(investor => investor[0]);
        const allowances = whitelist.map(investor => ether(investor[1]));

        await crowdsale.editContributors(investors, allowances);
    });
};

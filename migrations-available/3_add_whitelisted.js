const toWei = require('../util/toWei');


const DipTge = artifacts.require('../contracts/tokensale/DipTge');

module.exports = (deployer) => {
    deployer.then(async () => {
        const crowdsale = await DipTge.deployed();

        // Example
        const whitelist = [
            ['0x8EbCA32BD42D86EE51F762e968667e40b612b6f1', 10],
        ];

        const investors = whitelist.map(investor => investor[0]);
        const allowances = whitelist.map(investor => toWei(investor[1]));

        await crowdsale.editContributors(investors, allowances);
    });
};

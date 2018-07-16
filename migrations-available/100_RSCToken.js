const RSCToken = artifacts.require('../contracts/rscconversion/DSTContract');
const EventInfo = artifacts.require('../contracts/rscconversion/EventInfo');
const HackerGold = artifacts.require('../contracts/rscconversion/HackerGold');
const DipTge = artifacts.require('../contracts/tokensale/DipTge');
const DipToken = artifacts.require('../contracts/token/DipToken');


module.exports = (deployer, network, accounts) => deployer.then(async () => {

    // deploy RSC
    const { address: eventInfoAddr, } = await deployer.deploy(EventInfo);
    const { address: hackerGoldAddr, } = await deployer.deploy(HackerGold, '0xed42264e005d9052799a5971e439d5353bdb3f24');
    const dstName = 'etherisc';
    const dstSymbol = 'RSC';
    await deployer.deploy(RSCToken, eventInfoAddr, hackerGoldAddr, dstName, dstSymbol);

    // buy RSC
    const RSCTokenInstance = await RSCToken.deployed();
    await RSCTokenInstance.issueTokens('20000', '319810709968');
    await web3.eth.sendTransaction({ from: accounts[0], to: RSCTokenInstance.address, value: web3.toWei(0.01), });
    const rscBalance = await RSCTokenInstance.balanceOf(accounts[0]);
    console.log(`Balance of ${accounts[0]}: ${rscBalance}`);

    // whitelist accounts[0], create pool from accounts[1] in TGE
    const crowdsale = await DipTge.deployed();
    const investors = [accounts[0], accounts[1]];
    const allowances = [web3.toWei(100), web3.toWei(100)];
    const airdrops = [false, false];
    const bonuses = [0, 0];
    const lockupPeriods = [0, 0];
    await crowdsale.editContributors(investors, allowances, airdrops, bonuses, lockupPeriods);
    const contributor = await crowdsale.contributorList(accounts[0]);
    const pool = await crowdsale.contributorList(accounts[1]);
    console.log(`Whitelisted ${accounts[0]}: ${contributor}`);
    console.log(`Pool ${accounts[1]}: ${pool}`);

    // buy DIP
    await new Promise(resolve => setTimeout(resolve, 61 * 1000));
    await crowdsale.sendTransaction({ from: accounts[1], value: web3.toWei(0.01), });
    const dipTokenAddress = await crowdsale.token();
    const dipBalance = await DipToken.at(dipTokenAddress).balanceOf(accounts[1]);
    console.log(`Balance of ${accounts[1]}: ${dipBalance}`);

});

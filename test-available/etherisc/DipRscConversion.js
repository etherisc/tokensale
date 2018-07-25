const { BigNumber, } = web3;

require('chai').use(require('chai-as-promised')).use(require('chai-bignumber')(BigNumber)).should();

const { latestTime, } = require('../helpers/latestTime');
const { advanceBlock, } = require('../helpers/advanceToBlock');
const { increaseTimeTo, duration, } = require('../helpers/increaseTime');

const DSTContract = artifacts.require('../token/DSTContract');
const EventInfo = artifacts.require('../token/EventInfo');
const HackerGold = artifacts.require('../token/HackerGold');
const DipTge = artifacts.require('../contracts/tokensale/DipTge.sol');
const DipToken = artifacts.require('../contracts/token/DipToken');
const RSCConversion = artifacts.require('../contracts/rscconversion/RSCConversion');


contract('RSC conversion', (accounts) => {

    // const deployer = accounts[0];
    const rscWallet = accounts[2];
    const dipWallet = accounts[3];
    // const anonInvestor = accounts[4];
    const rscHolderWhitelisted = accounts[5];
    const rscHolderNotWhitelisted = accounts[6];
    const dipPool = accounts[7];

    // Predefined constants for RSC deployment
    const rscEtherPrice = 20000;
    const rscTotalSupply = 319810709968;
    const DipRscRate = 10 / 32;
    const rscDecimals = 10 ** 3;
    // const dipDecimals = 10 ** 18;

    // Predefined constants for DipTge deployment
    const hardCap = web3.toWei(60000);
    const rate = 5000;

    // Utils
    const bigZero = new BigNumber(0);

    // Deploy dependencies
    beforeEach(async () => {

        // Deploy original RSC token contract
        const { address: eventInfoAddr, } = await EventInfo.new();
        const { address: hackerGoldAddr, } = await HackerGold.new(rscWallet);
        this.RSCTokenInstance = await DSTContract.new(eventInfoAddr, hackerGoldAddr, 'etherisc', 'RSC');

        await this.RSCTokenInstance.issueTokens(rscEtherPrice, rscTotalSupply);

        // RSC tokens for rscHolderWhitelisted, rscHolderWhitelisted
        await web3.eth.sendTransaction({ from: rscHolderWhitelisted, to: this.RSCTokenInstance.address, value: web3.toWei(10), });
        await web3.eth.sendTransaction({ from: rscHolderNotWhitelisted, to: this.RSCTokenInstance.address, value: web3.toWei(10), });

        // Tge dates
        this.latestTime = await latestTime();
        await increaseTimeTo(this.latestTime + duration.hours(1));
        this.latestTime = await latestTime();

        this.startTime = this.latestTime + duration.days(1);
        this.startOpenPpTime = this.startTime + duration.weeks(1);
        this.endTime = this.startOpenPpTime + duration.weeks(1);
        this.lockInTime1 = this.startTime + duration.years(1);
        this.lockInTime2 = this.startTime + duration.years(2);

        // Deploy DipTge
        this.DipTgeInstance = await DipTge.new(
            this.startTime,
            this.startOpenPpTime,
            this.endTime,
            this.lockInTime1,
            this.lockInTime2,
            hardCap,
            rate,
            dipWallet
        );

        this.DipTokenAddress = await this.DipTgeInstance.token();
        this.DipTokenInstance = DipToken.at(this.DipTokenAddress);

        // Whitelist rscHolderWhitelisted
        const investors = [rscHolderWhitelisted];
        const allowances = [web3.toWei(100)];
        const airdrops = [false];
        const bonuses = [0];
        const lockupPeriods = [0];

        await this.DipTgeInstance.editContributors(investors, allowances, airdrops, bonuses, lockupPeriods);

        // Adjust time
        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();

        // Unpause DipToken and finalize DipTge
        await this.DipTgeInstance.unpauseToken();
        await this.DipTgeInstance.finalize();

        // Transfer DIP tokens to dipPool for conversions
        const dipForConversion = rscTotalSupply * DipRscRate;
        await this.DipTokenInstance.transfer(dipPool, dipForConversion, { from: dipWallet, });

        // Deploy RSCConversion contract
        this.RSCConversionInstance = await RSCConversion.new(
            this.DipTokenAddress,
            this.DipTgeInstance.address,
            this.RSCTokenInstance.address,
            dipPool
        );

        // Approve DIP tokens for conversion from dipPool to RSCConversion contract
        await this.DipTokenInstance.approve(this.RSCConversionInstance.address, dipForConversion, { from: dipPool, });

    });

    it('test setup', async () => {

        // DIP balance of dipPool
        const dipPoolBalance = await this.DipTokenInstance.balanceOf(dipPool);
        dipPoolBalance.should.be.bignumber.equal(new BigNumber(rscTotalSupply * DipRscRate));

        // RSC balance of rscHolderWhitelisted
        const rscHolderWhitelistedBalance = await this.RSCTokenInstance.balanceOf(rscHolderWhitelisted);
        rscHolderWhitelistedBalance.should.be.bignumber.equal(new BigNumber(rscEtherPrice * 10 * rscDecimals));

        // RSC balance of rscHolderNotWhitelisted
        const rscHolderNotWhitelistedBalance = await this.RSCTokenInstance.balanceOf(rscHolderNotWhitelisted);
        rscHolderNotWhitelistedBalance.should.be.bignumber.equal(new BigNumber(rscEtherPrice * 10 * rscDecimals));

        // rscHolderWhitelisted should be whitelisted
        const rscHolderWhitelistedTge = await this.DipTgeInstance.contributorList(rscHolderWhitelisted);
        rscHolderWhitelistedTge[0].should.be.bignumber.greaterThan(bigZero);

        // rscHolderNotWhitelisted should not be whitelisted
        const rscHolderNotWhitelistedTge = await this.DipTgeInstance.contributorList(rscHolderNotWhitelisted);
        rscHolderNotWhitelistedTge[0].should.be.bignumber.equal(bigZero);

    });

    // # 1
    it('should be possible to create conversion contract', async () => {

        try {

            await RSCConversion.new(
                this.DipTokenAddress,
                this.DipTgeInstance.address,
                this.RSCTokenInstance.address,
                dipPool
            );

        } catch (error) {

            assert.fail('should not throw');
            return;

        }

        assert.ok('should not have thrown before');

    });

    // // #2
    // it('should not be possible to convert RSC tokens before DIP_Pool is funded with DIP Tokens', async () => {
    //
    // });
    //
    // // #3
    // it('should not be possible to convert RSC tokens if DIP_Pool has not been funded sufficiently', async () => {
    //
    // });
    //
    // // #4
    // it('should not be possible to convert RSC tokens if DIP_Pool has not given approval to transfer DIP Tokens', async () => {
    //
    // });
    //
    // // #5
    // it('should not be possible to convert RSC tokens if RSC Token Holder is not whitelisted', async () => {
    //
    // });
    //
    // // #6
    // it('should not be possible to convert RSC tokens if allowance = 0 for a whitelisted RSC Token holder', async () => {
    //
    // });
    //
    // // #7
    // it('should not be possible to convert RSC tokens if RSC Token Holder has not approved conversion contract to transfer tokens', async () => {
    //
    // });
    //
    // // #8
    // it('should not be possible to convert RSC tokens if RSC Token Holder has not sufficient RSC Tokens', async () => {
    //
    // });
    //
    // // #9
    // it('should not be possible to convert RSC tokens if bonus > 0 and lockupPeriod != 1', async () => {
    //
    // });
    //
    // // #10-1
    // it('should be possible to convert RSC Tokens if DIP_Pool has sufficient DIP tokens', async () => {
    //
    // });
    //
    // // #10-2
    // it('should be possible to convert RSC Tokens if DIP_Pool has approved conversion contract to transfer tokens', async () => {
    //
    // });
    //
    // // #10-3
    // it('should be possible to convert RSC Tokens if RSC Token Holder is whitelisted and allowance > 0', async () => {
    //
    // });
    //
    // // #10-4
    // it('should be possible to convert RSC Tokens if RSC Token Holder is RSC Token Holder has approved conversion contract to transfer tokens', async () => {
    //
    // });
    //
    // // #11
    // it('should calculate number of converted DIP Tokens correctly (10/32)', async () => {
    //
    // });
    //
    // // #12
    // it('should calculate bonus correctly (for bonus = 4 and bonus = 10)', async () => {
    //
    // });
    //
    // // #13
    // it('should send converted RSC Tokens to 0x0', async () => {
    //
    // });
    //
    // // #14
    // it('should lock DIP Tokens with bonus', async () => {
    //
    // });
    //
    // // #15
    // it('should be possible to salvage Tokens sent to contract by accident', async () => {
    //
    // });

});

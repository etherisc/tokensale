const { BigNumber, } = web3;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const { latestTime, } = require('../helpers/latestTime');
const { advanceBlock, } = require('../helpers/advanceToBlock');
const { increaseTimeTo, duration, } = require('../helpers/increaseTime');
const { assertRevert, } = require('../helpers/assertRevert');

const contracts = {
    DSTContract: artifacts.require('../token/DSTContract'),
    EventInfo: artifacts.require('../token/EventInfo'),
    HackerGold: artifacts.require('../token/HackerGold'),
    DipTge: artifacts.require('../contracts/tokensale/DipTge.sol'),
    DipToken: artifacts.require('../contracts/token/DipToken'),
    RSCConversion: artifacts.require('../contracts/rscconversion/RSCConversion'),
};

const bigZero = new BigNumber(0);

class RSCConversionTest {

    constructor(accounts, web3, sources) {

        this.web3 = web3;

        this.contracts = sources;

        [
            this.deployer,
            this.rscWallet,
            this.dipWallet,
            this.anonInvestor,
            this.rscHolderWhitelisted,
            this.rscHolderNotWhitelisted,
            this.dipPool,
        ] = accounts;

        // Predefined constants for RSC deployment
        this.rscEtherPrice = 20000;
        this.rscTotalSupply = 319810709968;
        this.DipRscRate = 10 / 32;
        this.rscDecimals = 10 ** 3;
        this.dipDecimals = 10 ** 18;
        this.decimalsDiff = 10 ** 15;

        // Predefined constants for DipTge deployment
        this.hardCap = web3.toWei(60000);
        this.rate = 5000;

    }

    async deployRSCtoken() {

        // Deploy original RSC token contract
        const { address: eventInfoAddr, } = await this.contracts.EventInfo.new();
        const { address: hackerGoldAddr, } = await this.contracts.HackerGold.new(this.rscWallet);
        this.RSCTokenInstance = await this.contracts.DSTContract.new(eventInfoAddr, hackerGoldAddr, 'etherisc', 'RSC');

        await this.RSCTokenInstance.issueTokens(this.rscEtherPrice, this.rscTotalSupply);

    }

    async buyRSC() {

        // RSC tokens for rscHolderWhitelisted, rscHolderWhitelisted
        await this.web3.eth.sendTransaction({ from: this.rscHolderWhitelisted, to: this.RSCTokenInstance.address, value: this.web3.toWei(10), });
        await this.web3.eth.sendTransaction({ from: this.rscHolderNotWhitelisted, to: this.RSCTokenInstance.address, value: this.web3.toWei(10), });

    }

    async deployTGE() {

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
        this.DipTgeInstance = await this.contracts.DipTge.new(
            this.startTime,
            this.startOpenPpTime,
            this.endTime,
            this.lockInTime1,
            this.lockInTime2,
            this.hardCap,
            this.rate,
            this.dipWallet
        );

        this.DipTokenAddress = await this.DipTgeInstance.token();
        this.DipTokenInstance = this.contracts.DipToken.at(this.DipTokenAddress);

    }

    whitelist(allowancesArg, airdropsArg, bonusesArg, lockupPeriodsArg) {

        // Whitelist rscHolderWhitelisted
        const investors = [this.rscHolderWhitelisted];
        const allowances = allowancesArg || [this.web3.toWei(100)];
        const airdrops = airdropsArg || [false];
        const bonuses = bonusesArg || [0];
        const lockupPeriods = lockupPeriodsArg || [0];

        return this.DipTgeInstance.editContributors(investors, allowances, airdrops, bonuses, lockupPeriods);

    }

    async adjustTime() {

        // Adjust time
        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();

    }

    unpauseToken() {

        return this.DipTgeInstance.unpauseToken();

    }

    finalizeTge() {

        return this.DipTgeInstance.finalize();

    }

    async fundDipPool(dipAmount) {

        // Transfer DIP tokens to dipPool for conversions
        this.dipForConversion = this.rscTotalSupply * this.decimalsDiff * this.DipRscRate;
        await this.DipTokenInstance.transfer(this.dipPool, dipAmount || this.dipForConversion, { from: this.dipWallet, });

    }

    async deployRscConversion() {

        // Deploy RSCConversion contract
        this.RSCConversionInstance = await this.contracts.RSCConversion.new(
            this.DipTokenAddress,
            this.DipTgeInstance.address,
            this.RSCTokenInstance.address,
            this.dipPool
        );

    }

    async approveDipForConversion() {

        // Approve DIP tokens for conversion from dipPool to RSCConversion contract
        await this.DipTokenInstance.approve(this.RSCConversionInstance.address, this.dipForConversion, { from: this.dipPool, });

    }

}

contract('RSC conversion', (accounts) => {

    // #0
    it('successful scenario', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();
        await test.approveDipForConversion();

        // Check public fields
        const numinator = await test.RSCConversionInstance.CONVERSION_NUMINATOR();
        numinator.should.be.bignumber.equal(10);

        const denominator = await test.RSCConversionInstance.CONVERSION_DENOMINATOR();
        denominator.should.be.bignumber.equal(32);

        const decimalFactor = await test.RSCConversionInstance.CONVERSION_DECIMAL_FACTOR();
        decimalFactor.should.be.bignumber.equal(new BigNumber(10 ** 15));

        const dip = await test.RSCConversionInstance.DIP();
        dip.should.be.equal(test.DipTokenInstance.address);

        const dipTge = await test.RSCConversionInstance.DIP_TGE();
        dipTge.should.be.equal(test.DipTgeInstance.address);

        const rsc = await test.RSCConversionInstance.RSC();
        rsc.should.be.equal(test.RSCTokenInstance.address);

        // Check consistency
        new BigNumber(test.dipForConversion).should.be.bignumber.equal(test.rscTotalSupply * test.decimalsDiff * test.DipRscRate);
        const dipTotalSupply = await test.DipTokenInstance.totalSupply();
        // ~10%
        new BigNumber(test.dipForConversion).div(dipTotalSupply).should.be.bignumber.greaterThan(0.099);
        new BigNumber(test.dipForConversion).div(dipTotalSupply).should.be.bignumber.lessThan(0.1);

        // DIP balance of dipPool
        const dipPoolBalance = await test.DipTokenInstance.balanceOf(test.dipPool);
        dipPoolBalance.should.be.bignumber.equal(new BigNumber(test.dipForConversion));

        // Check RSCConversion contract DIP allowance
        const RSCConversionAllowance = await test.DipTokenInstance.allowance(test.dipPool, test.RSCConversionInstance.address);
        RSCConversionAllowance.should.bignumber.equal(test.dipForConversion);

        // RSC balance of rscHolderWhitelisted
        const rscHolderWhitelistedBalance = await test.RSCTokenInstance.balanceOf.call(test.rscHolderWhitelisted);
        rscHolderWhitelistedBalance.should.be.bignumber.equal(new BigNumber(test.rscEtherPrice * 10 * test.rscDecimals));

        // RSC balance of rscHolderNotWhitelisted
        const rscHolderNotWhitelistedBalance = await test.RSCTokenInstance.balanceOf.call(test.rscHolderNotWhitelisted);
        rscHolderNotWhitelistedBalance.should.be.bignumber.equal(new BigNumber(test.rscEtherPrice * 10 * test.rscDecimals));

        // rscHolderWhitelisted should be whitelisted
        const rscHolderWhitelistedTge = await test.DipTgeInstance.contributorList(test.rscHolderWhitelisted);
        rscHolderWhitelistedTge[0].should.be.bignumber.greaterThan(bigZero);

        // rscHolderNotWhitelisted should not be whitelisted
        const rscHolderNotWhitelistedTge = await test.DipTgeInstance.contributorList(test.rscHolderNotWhitelisted);
        rscHolderNotWhitelistedTge[0].should.be.bignumber.equal(bigZero);

        // Partial conversion
        const amount = 32 * test.rscDecimals;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });
        await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        const checkBalanceRSC0 = await test.RSCTokenInstance.balanceOf.call(test.rscHolderWhitelisted);
        const checkBalanceDIP0 = await test.DipTokenInstance.balanceOf.call(test.rscHolderWhitelisted);

        const remain = rscHolderWhitelistedBalance.sub(amount);
        checkBalanceRSC0.should.be.bignumber.equal(remain);
        checkBalanceDIP0.should.be.bignumber.equal(new BigNumber(amount).mul(test.decimalsDiff).mul(test.DipRscRate));
        checkBalanceDIP0.should.be.bignumber.equal(new BigNumber(10).mul(10 ** 18));

        // Full conversion
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, remain, { from: test.rscHolderWhitelisted, });
        await web3.eth.sendTransaction({ from: test.rscHolderWhitelisted, to: test.RSCConversionInstance.address, });

        const checkBalanceRSC1 = await test.RSCTokenInstance.balanceOf.call(test.rscHolderWhitelisted);
        const checkBalanceDIP1 = await test.DipTokenInstance.balanceOf.call(test.rscHolderWhitelisted);
        checkBalanceRSC1.should.be.bignumber.equal(bigZero);
        checkBalanceDIP1.should.be.bignumber.equal(rscHolderWhitelistedBalance.mul(test.decimalsDiff).mul(test.DipRscRate));

    });

    // #1
    it('should be possible to create conversion contract', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.deployTGE();

        try {

            await contracts.RSCConversion.new(
                test.DipTokenAddress,
                test.DipTgeInstance.address,
                test.RSCTokenInstance.address,
                test.dipPool
            );

        } catch (error) {

            assert.fail('should not throw');
            return;

        }

        assert.ok('should not have thrown before');

    });

    // #2
    it('should not be possible to convert RSC tokens before DIP_Pool is funded with DIP Tokens', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.deployRscConversion();

        const amount = 10000;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });

    // #3
    it('should not be possible to convert RSC tokens if DIP_Pool has not been funded sufficiently', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool(1);
        await test.deployRscConversion();
        await test.approveDipForConversion();

        const amount = 10000;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });

    // #4
    it('should not be possible to convert RSC tokens if DIP_Pool has not given approval to transfer DIP Tokens', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();

        const amount = 10000;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });

    // #5
    it('should not be possible to convert RSC tokens if RSC Token Holder is not whitelisted', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();
        await test.approveDipForConversion();


        const amount = 10000;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });

    // #6
    it('should not be possible to convert RSC tokens if allowance = 0 for a whitelisted RSC Token holder', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist([0], [0], [false], [0]);
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();
        await test.approveDipForConversion();

        const amount = 10000;
        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });

    // #7
    it('should not be possible to convert RSC tokens if RSC Token Holder has not approved conversion contract to transfer tokens', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();
        await test.approveDipForConversion();

        const amount = 10000;

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');
    });

    // #8
    it('should not be possible to convert RSC tokens if RSC Token Holder has not sufficient RSC Tokens', async () => {

        const test = new RSCConversionTest(accounts, web3, contracts);

        await test.deployRSCtoken();
        await test.buyRSC();
        await test.deployTGE();
        await test.whitelist();
        await test.adjustTime();
        await test.unpauseToken();
        await test.finalizeTge();
        await test.fundDipPool();
        await test.deployRscConversion();
        await test.approveDipForConversion();

        const balance = await test.RSCTokenInstance.balanceOf.call(test.rscHolderWhitelisted);

        const amount = balance.add(1).toString();

        await test.RSCTokenInstance.approve(test.RSCConversionInstance.address, amount, { from: test.rscHolderWhitelisted, });

        try {

            await test.RSCConversionInstance.convert(amount, { from: test.rscHolderWhitelisted, });

        } catch (error) {

            assertRevert(error);
            return;

        }

        assert.fail('should have thrown before');

    });
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

const { assertRevert, } = require('../helpers/assertRevert');
const { increaseTimeTo, duration, } = require('../helpers/increaseTime');
const { latestTime, } = require('../helpers/latestTime');
const { ether, } = require('../helpers/ether');
const { advanceBlock, } = require('../helpers/advanceToBlock');
const { EVMThrow, } = require('../helpers/EVMThrow');

const { BigNumber, } = web3;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const DipTge = artifacts.require('../../contracts/tokensale/DipTge.sol');
const DipToken = artifacts.require('../../contracts/token/DipToken.sol');
const StandardTokenMock = artifacts.require('../helpers/StandardTokenMock.sol');
const RscConversion = artifacts.require('../../contracts/tokensale/RscConversion.sol');


contract('DipTge', (accounts) => {

    const owner = accounts[0];
    const wallet = accounts[2];
    const purchaser = accounts[3];
    const anonInvestor = accounts[4];
    const allowedInvestor = accounts[5];

    const rate = new BigNumber(1000);
    const hardCap = ether(1200);
    const someValue = ether(42);
    const allowance = ether(51);
    const zeroEther = ether(0);
    const zeroBig = new BigNumber(0);

    // Contributor types
    const REGULAR = 1;
    const ECA = 2;
    const RSC = 3;
    const RSC_USA = 4;
    const ECA_LOCK = 5;
    const USA = 6;
    const TEAM = 7;
    const FOUNDER = 8;

    const bonus10 = 10;
    const bonus25 = 4;

    beforeEach(async () => {
        this.latestTime = await latestTime();
        await increaseTimeTo(this.latestTime + duration.hours(1));
        this.latestTime = await latestTime();

        this.startTime = this.latestTime + duration.days(1);
        this.startOpenPpTime = this.startTime + duration.weeks(1);
        this.endTime = this.startOpenPpTime + duration.weeks(1);
        this.lockInTime1 = this.startTime + duration.years(1);
        this.lockInTime2 = this.startTime + duration.years(2);

        this.rscToken = await StandardTokenMock.new(accounts[0], 100);

        this.crowdsale = await DipTge.new(
            this.startTime,
            this.startOpenPpTime,
            this.endTime,
            this.lockInTime1,
            this.lockInTime2,
            hardCap,
            rate,
            wallet,
            this.rscToken.address
        );

        const tokenAddress = await this.crowdsale.token();
        this.token = await DipToken.at(tokenAddress);
    });

    it('should throw if rate == 0', async () => {
        try {
            await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                zeroBig,
                wallet,
                this.rscToken.address
            );
        } catch (error) {
            assertRevert(error);
            return;
        }

        assert.fail('should have thrown before');
    });

    it('should have the token paused at start', async () => {
        const paused = await this.token.paused();
        paused.should.be.equal(true);
    });

    it('should have state == state.pendingStart at start', async () => {
        const state = await this.crowdsale.crowdsaleState();
        state.toNumber().should.be.equal(0);
    });

    it('should have correct parameters at start', async () => {
        let result;

        result = await this.crowdsale.hardCap();
        result.should.be.bignumber.equal(hardCap);

        result = await this.crowdsale.startTime();
        result.toNumber().should.be.equal(this.startTime);

        result = await this.crowdsale.startOpenPpTime();
        result.toNumber().should.be.equal(this.startOpenPpTime);

        result = await this.crowdsale.endTime();
        result.toNumber().should.be.equal(this.endTime);

        result = await this.crowdsale.lockInTime1();
        result.toNumber().should.be.equal(this.lockInTime1);

        result = await this.crowdsale.lockInTime2();
        result.toNumber().should.be.equal(this.lockInTime2);

        result = await this.crowdsale.rate();
        result.should.be.bignumber.equal(rate);

        result = await this.crowdsale.wallet();
        result.should.be.equal(wallet);
    });


    describe('bonus calculations', () => {
        it('tokens calculation with 0 bonus should be correct', async () => {
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);

            tokens.should.be.bignumber.equal(rate.mul(contribution));
        });

        it('tokens calculation with 4 bonus should be correct', async () => {
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA_LOCK]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);

            tokens.should.be.bignumber.equal(contribution.add(contribution.div(bonus25)).mul(rate));
        });

        it('tokens calculation with 10 bonus should be correct', async () => {
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);

            tokens.should.be.bignumber.equal(contribution.add(contribution.div(bonus10)).mul(rate));
        });

        it('should throw if bonus is invalid', async () => {
            try {
                await this.crowdsale.editContributors([allowedInvestor], [allowance], [10]);

                await this.crowdsale.calculateTokens(allowedInvestor, ether(1));
            } catch (error) {
                assertRevert(error);
                return;
            }

            assert.fail('should have thrown before');
        });
    });

    describe('whitelisting process', () => {

        let maxContrib;

        beforeEach(async () => {

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR], {
                gaslimit: 4700000,
            });

        });

        it('should throw if first array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance, 0], [REGULAR, REGULAR]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if second array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR, REGULAR]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if second array has invalid value', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [10]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should yield maxContrib=0 before start', async () => {

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            maxContrib = await this.crowdsale.calculateMaxContribution(allowedInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=allowance in priorityPass phase', async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(1);

            maxContrib = await this.crowdsale.calculateMaxContribution(allowedInvestor);
            maxContrib.should.be.bignumber.equal(allowance);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=hardCap in open priorityPass phase', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(2);

            maxContrib = await this.crowdsale.calculateMaxContribution(allowedInvestor);
            maxContrib.should.be.bignumber.equal(hardCap);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=0 after crowdsale end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(5));
            await advanceBlock();
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(3);

            maxContrib = await this.crowdsale.calculateMaxContribution(allowedInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should reject whitelist participants if not owner', async () => {

            try {

                await this.crowdsale.editContributors(
                    [allowedInvestor],
                    [allowance],
                    [REGULAR],
                    {
                        from: anonInvestor,
                    }
                );

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should update participants by owner', async () => {

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance.mul(2)],
                [REGULAR]
            );

            await increaseTimeTo(this.startTime);
            await advanceBlock();
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(1);

            maxContrib = await this.crowdsale.calculateMaxContribution(allowedInvestor);
            maxContrib.should.be.bignumber.equal(allowance.mul(2));

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);


        });

    });

    describe('accepting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance.mul(3)],
                [REGULAR]
            );

            await increaseTimeTo(this.startTime);
            await advanceBlock();

        });


        it('should accept payments from priority pass members', async () => {

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.buyTokens(allowedInvestor, {
                from: purchaser,
                value: allowance,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance.mul(2)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowance.mul(2));

        });

        it('should partially accept payments from priority pass members', async () => {

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance.mul(3)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowance.mul(3));

        });

        it('should limit to hardCap in priority Phase for priority pass members', async () => {

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [hardCap.add(1)],
                [REGULAR]
            );

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap.add(11),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap);

        });

        it('should accept higher payments from priority pass members in opened phase', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowance.mul(4));

        });

        it('tokens should be issued correctly for bonus 0', async () => {
            const contribution = ether(1);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);
            tokens.should.be.bignumber.equal(rate.mul(contribution));

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: contribution,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(contribution));

            const contributor = await this.crowdsale.contributorList(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(tokens);
            tokenBalance.should.be.bignumber.equal(contributor[2]);
        });

        it('tokens should be issued correctly for bonus 4', async () => {
            const contribution = ether(1);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA_LOCK]);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);
            tokens.should.be.bignumber.equal(contribution.add(contribution.div(bonus25)).mul(rate));

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: contribution,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(contribution.add(contribution.div(bonus25)).mul(rate));

            const contributor = await this.crowdsale.contributorList(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(tokens);
            tokenBalance.should.be.bignumber.equal(contributor[2]);
        });

        it('tokens should be issued correctly for bonus 10', async () => {
            const contribution = ether(1);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA]);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution);
            tokens.should.be.bignumber.equal(contribution.add(contribution.div(bonus10)).mul(rate));

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: contribution,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(contribution.add(contribution.div(bonus10)).mul(rate));

            const contributor = await this.crowdsale.contributorList(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(tokens);
            tokenBalance.should.be.bignumber.equal(contributor[2]);
        });
    });

    describe('rejecting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

        });

        it('should reject payments before start from anybody', async () => {

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(anonInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments before start from whitelisted participant', async () => {

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(allowedInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments from anybody in priority pass phase', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue.mul(4),
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(anonInvestor, {
                from: anonInvestor,
                value: someValue.mul(4),
            }).should.be.rejectedWith(EVMThrow);
        });

        it('should reject payments after end from anybody', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(5));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(anonInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments after end from whitelisted participant', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(5));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(allowedInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments after hardCap is reached', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

    });

    describe('misceallenous tests', () => {

        it('should throw if token doesn\'t mint', async () => {

            try {

                this.crowdsale = await DipTge.new(
                    this.startTime,
                    this.startOpenPpTime,
                    this.endTime,
                    this.lockInTime1,
                    this.lockInTime2,
                    hardCap,
                    new BigNumber(100000000000),
                    wallet,
                    this.rscToken.address
                );

                await increaseTimeTo(this.startOpenPpTime);
                await advanceBlock();

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

                await this.crowdsale.buyTokens(allowedInvestor, {
                    from: allowedInvestor,
                    value: someValue,
                });

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if beneficiary is 0x0', async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.buyTokens(0, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should perform finalizing actions', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(5));
            await advanceBlock();

            await this.crowdsale.finalize().should.be.fulfilled;

            const totalSupply = await this.token.totalSupply();
            const maxSupply = await this.token.MAXIMUM_SUPPLY();
            totalSupply.should.be.bignumber.equal(maxSupply);

            const balance = await this.token.balanceOf(wallet);
            balance.should.be.bignumber.equal(maxSupply);

            const tokenowner = await this.token.owner();
            tokenowner.should.be.equal(owner);

        });

        it('should salvage tokens which have been sent to tge contract by mistake', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            await this.token.transfer(this.crowdsale.address, rate.mul(someValue), {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.salvageTokens(this.token.address, allowedInvestor)
                .should.be.fulfilled;

            const balance = await this.token.balanceOf(allowedInvestor);
            balance.should.be.bignumber.equal(rate.mul(someValue));

        });

        it('should salvage tokens which have been sent to token contract by mistake', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.minutes(5));
            await advanceBlock();
            await this.crowdsale.setCrowdsaleState();

            await this.crowdsale.finalize().should.be.fulfilled;

            await this.token.unpause().should.be.fulfilled;

            await this.token.transfer(this.token.address, rate.mul(someValue), {
                from: allowedInvestor,
            }).should.be.fulfilled;


            await this.token.salvageTokens(this.token.address, allowedInvestor)
                .should.be.fulfilled;

            const balance = await this.token.balanceOf(allowedInvestor);
            balance.should.be.bignumber.equal(rate.mul(someValue));

        });

        it('should reject calling salvageTokens by non-owner', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: someValue,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            await this.token.transfer(this.crowdsale.address, rate.mul(someValue), {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.salvageTokens(this.token.address, allowedInvestor, {
                from: allowedInvestor,
            }).should.be.rejectedWith(EVMThrow);

        });

    });

    describe('Regular contributor (1)', () => {

        beforeEach(async () => {
            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [REGULAR]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);
        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within regular allowance during priority pass phase', async () => {
            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));
        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(hardCap)).should.be.bignumber.equal(zeroBig);

        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should not be locked', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(rate.mul(allowance));
        });
    });

    describe('ECA contributor (2)', () => {

        beforeEach(async () => {
            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);
        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within individual allowance during priority pass phase', async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(bonus10)).mul(rate));

        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(hardCap.add(hardCap.div(bonus10)).mul(rate));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should get 10% bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(bonus10)).mul(rate));

        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should not be locked', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(allowance.add(allowance.div(bonus10)).mul(rate));

        });

    });

    describe('RSC contributor (3)', () => {

        beforeEach(async () => {

            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [RSC]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);

        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within regular allowance during priority pass phase', async () => {
            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));
        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(hardCap)).should.be.bignumber.equal(zeroBig);

        });

        it('should be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            // todo: check balances!

        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should not be locked', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(tokenBalance0);
        });
    });

    describe('RSC_USA contributor (4)', () => {

        beforeEach(async () => {

            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [RSC_USA]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);

        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within regular allowance during priority pass phase', async () => {
            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));
        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(hardCap)).should.be.bignumber.equal(zeroBig);

        });

        it('should be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            // todo: check balances!

        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should not be locked for 1 year', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.days(150));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(1));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(tokenBalance0);
        });
    });


    describe('ECA_LOCK contributor (5)', () => {

        beforeEach(async () => {
            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [ECA_LOCK]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);
        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within individual allowance during priority pass phase', async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(bonus25)).mul(rate));

        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(hardCap.add(hardCap.div(bonus25)).mul(rate));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should get 25% bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(bonus25)).mul(rate));

        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should be locked for 1 year', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.days(150));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(1));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(allowance.add(allowance.div(bonus25)).mul(rate));
        });

    });

    describe('USA contributor (6)', () => {

        beforeEach(async () => {

            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [USA]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);

        });

        it('should not buy token before tge start', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should buy token within regular allowance during priority pass phase', async () => {
            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));
        });

        it('should buy token after priority pass phase within hardcap', async () => {
            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap));

        });

        it('should not buy token after tge end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: hardCap,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(hardCap)).should.be.bignumber.equal(zeroBig);

        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop', async () => {
            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;
        });

        it('token should be locked for 1 year', async () => {

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            const tokenBalance0 = await this.token.balanceOf(allowedInvestor);

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.days(150));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(1));
            await advanceBlock();

            await this.token.transfer(anonInvestor, tokenBalance0, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance1 = await this.token.balanceOf(allowedInvestor);
            tokenBalance1.should.be.bignumber.equal(zeroBig);

            const tokenBalance2 = await this.token.balanceOf(anonInvestor);
            tokenBalance2.should.be.bignumber.equal(rate.mul(allowance));
        });

    });

    describe('Team member (7)', () => {

        beforeEach(async () => {

            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [TEAM]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);

        });

        it('should not be able to buy token', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop before the end of TGE', async () => {

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.start);
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

        });

        it('should be able to get airdrop limited by allowance using airdrop()', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should be able to get airdrop limited by allowance using airdropFor(_contributor)', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should be able to get airdrop more that once', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(allowance)).should.be.bignumber.equal(zeroBig);

        });

        it('token should be locked for 1 year', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.days(150));
            await advanceBlock();

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(1));
            await advanceBlock();

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.be.fulfilled;
        });

    });

    describe('Founder (8)', () => {

        beforeEach(async () => {

            this.rscToken = await StandardTokenMock.new(allowedInvestor, 1000);
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet,
                this.rscToken.address
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [FOUNDER]);

            const rscConversionAddress = await this.crowdsale.rscConversion();
            this.rscConversion = await RscConversion.at(rscConversionAddress);

        });

        it('should not be able to buy token', async () => {
            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.not.be.fulfilled;
        });

        it('should not be able to convert RSC token', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.rscToken.approve(this.rscConversion.address, 1000, {
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.rscConversion.convert(1000, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;
        });

        it('should not be able to get airdrop before the end of TGE', async () => {

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.start);
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.startOpenPpTime);
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.not.be.fulfilled;

        });

        it('should be able to get airdrop limited by allowance using airdrop()', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should be able to get airdrop limited by allowance using airdropFor(_contributor)', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should be able to get airdrop more that once', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.airdropFor(allowedInvestor, {
                from: anonInvestor,
            }).should.not.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowance));

        });

        it('should not get bonus', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);

            tokenBalance.sub(rate.mul(allowance)).should.be.bignumber.equal(zeroBig);

        });

        it('token should be locked for 2 years', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();

            await this.crowdsale.airdrop({
                from: allowedInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(1));
            await advanceBlock();

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.not.be.fulfilled;

            await increaseTimeTo(this.endTime + duration.years(2));
            await advanceBlock();

            await this.token.transfer(anonInvestor, 100, {
                from: allowedInvestor,
            }).should.be.fulfilled;
        });
    });
});

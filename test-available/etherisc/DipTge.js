const { assertRevert, } = require('../helpers/assertRevert');
const { assertJump, } = require('../helpers/assertJump');
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

    const CAN_BUY = false;
    const GETS_AIRDROP = true;

    const BONUS_0 = 0;
    const BONUS_10 = 10;
    const BONUS_25 = 4;
    const BONUS_INVALID = 20;


    const LOCKUP_ZERO = 0;
    const LOCKUP_1YR = 1;
    const LOCKUP_2YR = 2;
    const LOCKUP_INVALID = 30;


    beforeEach(async () => {
        this.latestTime = await latestTime();
        await increaseTimeTo(this.latestTime + duration.hours(1));
        this.latestTime = await latestTime();

        this.startTime = this.latestTime + duration.days(1);
        this.startOpenPpTime = this.startTime + duration.weeks(1);
        this.endTime = this.startOpenPpTime + duration.weeks(1);
        this.lockInTime1 = this.startTime + duration.years(1);
        this.lockInTime2 = this.startTime + duration.years(2);

        this.crowdsale = await DipTge.new(
            this.startTime,
            this.startOpenPpTime,
            this.endTime,
            this.lockInTime1,
            this.lockInTime2,
            hardCap,
            rate,
            wallet
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
                wallet
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
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_0], [LOCKUP_ZERO]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);

            tokens.should.be.bignumber.equal(rate.mul(contribution));
        });

        it('tokens calculation with 4 bonus should be correct', async () => {
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_25], [LOCKUP_1YR]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);

            tokens.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_25)).mul(rate));
        });

        it('tokens calculation with 10 bonus should be correct', async () => {
            await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_10], [LOCKUP_1YR]);

            const contribution = ether(1);

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);

            tokens.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_10)).mul(rate));
        });
    });

    describe('whitelisting process', () => {

        let maxContrib;

        beforeEach(async () => {

            await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_0], [LOCKUP_ZERO], {
                gaslimit: 4700000,
            });

        });

        it('should throw if first array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance, 0], [CAN_BUY], [BONUS_0], [LOCKUP_ZERO]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if second array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY, CAN_BUY], [BONUS_0], [LOCKUP_ZERO]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if third array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_0, BONUS_0], [LOCKUP_ZERO]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if third array has invalid value', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_INVALID], [LOCKUP_ZERO]);

            } catch (error) {
                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if fourth array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_0], [LOCKUP_ZERO, LOCKUP_ZERO]);

            } catch (error) {

                assertRevert(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if fourth array has invalid value', async () => {

            try {

                await this.crowdsale.editContributors([allowedInvestor], [allowance], [CAN_BUY], [BONUS_0], [LOCKUP_INVALID]);

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
                    [CAN_BUY],
                    [BONUS_0],
                    [LOCKUP_ZERO],
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
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
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
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
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
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
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

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);
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

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_25],
                [LOCKUP_1YR]
            );

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);
            tokens.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_25)).mul(rate));

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: contribution,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_25)).mul(rate));

            const contributor = await this.crowdsale.contributorList(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(tokens);
            tokenBalance.should.be.bignumber.equal(contributor[2]);
        });

        it('tokens should be issued correctly for bonus 10', async () => {
            const contribution = ether(1);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_10],
                [LOCKUP_1YR]
            );

            const tokens = await this.crowdsale.calculateTokens(allowedInvestor, contribution, rate);
            tokens.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_10)).mul(rate));

            await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: contribution,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(contribution.add(contribution.div(BONUS_10)).mul(rate));

            const contributor = await this.crowdsale.contributorList(allowedInvestor);
            tokenBalance.should.be.bignumber.equal(tokens);
            tokenBalance.should.be.bignumber.equal(contributor[2]);
        });
    });

    describe('rejecting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

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
                    wallet
                );

                await increaseTimeTo(this.startOpenPpTime);
                await advanceBlock();

                await this.crowdsale.editContributors(
                    [allowedInvestor],
                    [allowance],
                    [CAN_BUY],
                    [BONUS_0],
                    [LOCKUP_ZERO]
                );

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

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

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

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

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

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

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

    describe('Regular contributor', () => {

        beforeEach(async () => {
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_0],
                [LOCKUP_ZERO]
            );

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

            let txResult = await this.crowdsale.sendTransaction({
                from: allowedInvestor,
                value: allowance,
            }).should.be.fulfilled;

            console.log("Gas used: ", txResult.receipt.gasUsed)

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

    describe('ECA_10 contributor', () => {

        beforeEach(async () => {
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_10],
                [LOCKUP_1YR]
            );

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
            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_10)).mul(rate));

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
            tokenBalance.should.be.bignumber.equal(hardCap.add(hardCap.div(BONUS_10)).mul(rate));

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

            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_10)).mul(rate));

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
            tokenBalance2.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_10)).mul(rate));
        });

    });


    describe('ECA_25 contributor', () => {

        beforeEach(async () => {
            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [CAN_BUY],
                [BONUS_25],
                [LOCKUP_1YR]
            );

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
            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_25)).mul(rate));

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
            tokenBalance.should.be.bignumber.equal(hardCap.add(hardCap.div(BONUS_25)).mul(rate));

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

            tokenBalance.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_25)).mul(rate));

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
            tokenBalance2.should.be.bignumber.equal(allowance.add(allowance.div(BONUS_25)).mul(rate));
        });

    });

    describe('Team member', () => {

        beforeEach(async () => {

            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [GETS_AIRDROP],
                [BONUS_0],
                [LOCKUP_1YR]
            );

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

    describe('Founder', () => {

        beforeEach(async () => {

            this.crowdsale = await DipTge.new(
                this.startTime,
                this.startOpenPpTime,
                this.endTime,
                this.lockInTime1,
                this.lockInTime2,
                hardCap,
                rate,
                wallet
            );

            const tokenAddress = await this.crowdsale.token();
            this.token = await DipToken.at(tokenAddress);

            await this.crowdsale.editContributors(
                [allowedInvestor],
                [allowance],
                [GETS_AIRDROP],
                [BONUS_0],
                [LOCKUP_2YR]
            );

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

        it('should not be able to get airdrop more that once', async () => {

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

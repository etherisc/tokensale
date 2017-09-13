const assertJump = require('../helpers/assertJump').assertJump;
const ether = require('../helpers/ether').ether;
const advanceToBlock = require('../helpers/advanceToBlock').advanceToBlock;
const EVMThrow = require('../helpers/EVMThrow').EVMThrow;

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const DipTge = artifacts.require('../../contracts/tokensale/DipTge');
const DipToken = artifacts.require('../../contracts/token/DipToken');

contract('DipTge', (accounts) => {

    const investor = accounts[1];
    const wallet = accounts[2];
    const purchaser = accounts[3];
    const anonInvestor = accounts[4];
    const ppInvestor = accounts[5];
    const otherInvestor = accounts[6];

    const rate = new BigNumber(1000);
    const minCap = ether(1000);
    const hardCap1 = ether(1100);
    const hardCap2 = ether(1200);
    const someValue = ether(42);
    const allowPP = ether(51);
    const allowOther = ether(52);
    const zeroEther = ether(0);
    const zeroBig = new BigNumber(0);


    beforeEach(async () => {

        this.startBlock = web3.eth.blockNumber + 5; // 10;
        this.startOpenPpBlock = web3.eth.blockNumber + 10; // 20;
        this.startPublicBlock = web3.eth.blockNumber + 15; // 30;
        this.endBlock = web3.eth.blockNumber + 20; // 40;
        this.crowdsale = await DipTge.new(
            this.startBlock,
            this.startOpenPpBlock,
            this.startPublicBlock,
            this.endBlock,
            minCap,
            hardCap1,
            hardCap2,
            rate,
            wallet);
        this.token = DipToken.at(await this.crowdsale.token());

    });



    it('should throw if rate == 0', async () => {

        try {

            this.startBlock = web3.eth.blockNumber + 5; // 10;
            this.startOpenPpBlock = web3.eth.blockNumber + 10; // 20;
            this.startPublicBlock = web3.eth.blockNumber + 15; // 30;
            this.endBlock = web3.eth.blockNumber + 20; // 40;
            this.crowdsale = await DipTge.new(
                this.startBlock,
                this.startOpenPpBlock,
                this.startPublicBlock,
                this.endBlock,
                minCap,
                hardCap1,
                hardCap2,
                zeroBig,
                wallet);

        } catch (error) {

            assertJump(error);
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

        let result = await this.crowdsale.minCap();
        result.should.be.bignumber.equal(minCap);

        result = await this.crowdsale.hardCap1();
        result.should.be.bignumber.equal(hardCap1);

        result = await this.crowdsale.hardCap2();
        result.should.be.bignumber.equal(hardCap2);

        result = await this.crowdsale.startBlock();
        result.toNumber().should.be.equal(this.startBlock);

        result = await this.crowdsale.startOpenPpBlock();
        result.toNumber().should.be.equal(this.startOpenPpBlock);

        result = await this.crowdsale.startPublicBlock();
        result.toNumber().should.be.equal(this.startPublicBlock);

        result = await this.crowdsale.endBlock();
        result.toNumber().should.be.equal(this.endBlock);

        result = await this.crowdsale.rate();
        result.should.be.bignumber.equal(rate);

        result = await this.crowdsale.wallet();
        result.should.be.equal(wallet);

    });

    describe('whitelisting process', () => {

        let maxContrib;

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor], [allowPP, 0], [0, allowOther]);

        });

        it('should throw if first array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors(
                    [ppInvestor, otherInvestor], [allowPP, 0, 0], [0, allowOther]);

            } catch (error) {

                assertJump(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if second array has wrong length', async () => {

            try {

                await this.crowdsale.editContributors(
                    [ppInvestor, otherInvestor], [allowPP, 0], [0, allowOther, 0]);

            } catch (error) {

                assertJump(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should yield maxContrib=0 before start', async () => {

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(0);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=allowance in priorityPass phase', async () => {

            await advanceToBlock(this.startBlock);
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(1);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(allowPP);

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(allowOther);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=hardCap1 in open priorityPass phase', async () => {

            await advanceToBlock(this.startOpenPpBlock);
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(2);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(hardCap1);

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(hardCap1);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should yield maxContrib=hardCap2 in public phase', async () => {

            await advanceToBlock(this.startPublicBlock);
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(3);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(hardCap2);

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(hardCap2);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(hardCap2);

        });

        it('should yield maxContrib=0 after crowdsale end', async () => {

            await advanceToBlock(this.endBlock + 1);
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(4);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);

        });

        it('should reject whitelist participants if not owner', async () => {

            try {

                await this.crowdsale.editContributors(
                    [ppInvestor, otherInvestor],
                    [allowPP, zeroEther],
                    [zeroEther, allowOther], {
                        from: anonInvestor,
                    });

            } catch (error) {

                assertJump(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should update participants by owner', async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor],
                [allowPP.mul(2), zeroEther],
                [zeroEther, allowOther.mul(2)]
            );

            await advanceToBlock(this.startBlock);
            await this.crowdsale.setCrowdsaleState();

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(1);

            maxContrib = await this.crowdsale.calculateMaxContribution(ppInvestor);
            maxContrib.should.be.bignumber.equal(allowPP.mul(2));

            maxContrib = await this.crowdsale.calculateMaxContribution(otherInvestor);
            maxContrib.should.be.bignumber.equal(allowOther.mul(2));

            maxContrib = await this.crowdsale.calculateMaxContribution(anonInvestor);
            maxContrib.should.be.bignumber.equal(zeroEther);


        });

    });

    describe('accepting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor],
                [allowPP.mul(3), zeroEther],
                [zeroEther, allowOther.mul(3)]
            );

            await advanceToBlock(this.startBlock);

        });


        it('should accept payments from priority pass members', async () => {

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: allowPP,
            }).should.be.fulfilled;

            await this.crowdsale.buyTokens(ppInvestor, {
                from: purchaser,
                value: allowPP,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(ppInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowPP.mul(2)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowPP.mul(2));

        });

        it('should accept payments from other listed members', async () => {

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: allowOther,
            }).should.be.fulfilled;

            await this.crowdsale.buyTokens(otherInvestor, {
                from: purchaser,
                value: allowOther,
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(otherInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowOther.mul(2)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowOther.mul(2));

        });

        it('should partially accept payments from priority pass members', async () => {

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: allowPP.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(ppInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowPP.mul(3)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowPP.mul(3));

        });

        it('should partially accept payments from other listed members', async () => {

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: allowOther.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(otherInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowOther.mul(3)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowOther.mul(3));

        });

        it('should limit to hardCap1 in priority Phase for priority pass members', async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor],
                [hardCap1.add(1), zeroEther],
                [zeroEther, hardCap1.add(2)]
            );

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: hardCap1.add(11),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(ppInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap1));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap1);

        });

        it('should limit to hardCap1 in priority Phase for other listed members', async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor],
                [hardCap1.add(1), zeroEther],
                [zeroEther, hardCap1.add(2)]
            );

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: hardCap1.add(12),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(otherInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(hardCap1));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap1);

        });

        it('should accept higher payments from priority pass members in opened phase', async () => {

            await advanceToBlock(this.startOpenPpBlock);

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: allowPP.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(ppInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowPP.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowPP.mul(4));

        });

        it('should accept higher payments from other listed members in opened phase', async () => {

            await advanceToBlock(this.startOpenPpBlock);

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: allowOther.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(otherInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowOther.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowOther.mul(4));

        });

        it('should accept higher payments from priority pass members in public phase', async () => {

            await advanceToBlock(this.startPublicBlock);

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: allowPP.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(ppInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowPP.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowPP.mul(4));

        });

        it('should accept higher payments from other listed members in public phase', async () => {

            await advanceToBlock(this.startPublicBlock);

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: allowOther.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(otherInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(allowOther.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(allowOther.mul(4));

        });

        it('should accept higher payments from anybody in public phase', async () => {

            await advanceToBlock(this.startPublicBlock);

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue.mul(4),
            }).should.be.fulfilled;

            const tokenBalance = await this.token.balanceOf(anonInvestor);
            tokenBalance.should.be.bignumber.equal(rate.mul(someValue.mul(4)));

            const weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(someValue.mul(4));

        });

    });

    describe('rejecting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor], [allowPP, 0], [0, allowOther]);

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

        it('should reject payments before start from whitelisted PP participant', async () => {

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(ppInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments before start from whitelisted other participant', async () => {

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(otherInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments after end from anybody', async () => {

            await advanceToBlock(this.endBlock + 1);

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(anonInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments after end from whitelisted PP participant', async () => {

            await advanceToBlock(this.endBlock + 1);

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(ppInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments after end from whitelisted other participant', async () => {

            await advanceToBlock(this.endBlock + 1);

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(otherInvestor, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });


        // should reject payments over allowance from whitelisted PP participant
        // should reject payments over allowance from whitelisted other participant
        // should reject payments after reaching hardCap1 from whitelisted PP participants
        // should reject payments after reaching hardCap1 from whitelisted other participants
        // should reject payments after reaching hardCap2 from whitelisted PP participants
        // should reject payments after reaching hardCap2 from whitelisted other participants

    });

    describe('misceallenous tests', () => {


        it('should throw if token doesn`t mint', async () => {

            try {

                this.crowdsale = await DipTge.new(
                    this.startBlock,
                    this.startOpenPpBlock,
                    this.startPublicBlock,
                    this.endBlock,
                    minCap,
                    hardCap1,
                    hardCap2,
                    // we set rate so that MAXIMUM_SUPPLY will be surpassed
                    new BigNumber(100000000),
                    wallet);

                await advanceToBlock(this.startPublicBlock);

                await this.crowdsale.buyTokens(anonInvestor, {
                    from: purchaser,
                    value: someValue,
                });

            } catch (error) {

                assertJump(error);
                return;

            }

            assert.fail('should have thrown before');

        });

        it('should throw if beneficiary is 0x0', async () => {

            await advanceToBlock(this.startBlock);

            await this.crowdsale.buyTokens(0, {
                from: purchaser,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should transfer remaining tokens to wallet', async () => {

            await advanceToBlock(this.endBlock + 1);

            await this.crowdsale.finalize().should.be.fulfilled;

            const totalSupply = await this.token.totalSupply();
            const maxSupply = await this.token.MAXIMUM_SUPPLY();
            totalSupply.should.be.bignumber.equal(maxSupply);

            const balance = await this.token.balanceOf(wallet);
            balance.should.be.bignumber.equal(maxSupply);

        });

        it('should end sale after hardCap2 is reached', async () => {

            await advanceToBlock(this.startPublicBlock);

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: hardCap2,
            }).should.be.fulfilled;

            let weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap2);

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.fulfilled;

            weiRaised = await this.crowdsale.weiRaised();
            weiRaised.should.be.bignumber.equal(hardCap2);

            const state = await this.crowdsale.crowdsaleState();
            state.toNumber().should.be.equal(4);

        });

        it('should salvage tokens which have been sent to contract by mistake', async () => {

            await advanceToBlock(this.startPublicBlock);

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.fulfilled;

            await this.crowdsale.unpauseToken().should.be.fulfilled;

            await this.token.transfer(this.crowdsale.address, rate.mul(someValue), {
                from: anonInvestor,
            }).should.be.fulfilled;

            await this.crowdsale.salvageTokens(this.token.address, anonInvestor)
                .should.be.fulfilled;

            const balance = await this.token.balanceOf(anonInvestor);
            balance.should.be.bignumber.equal(rate.mul(someValue));

        });

    });

});

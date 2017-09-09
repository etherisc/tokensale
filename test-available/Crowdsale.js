const ether = require('./helpers/ether').ether;
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;
const EVMThrow = require('./helpers/EVMThrow').EVMThrow;

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Crowdsale = artifacts.require('Crowdsale');
const MintableToken = artifacts.require('MintableToken');

contract('Crowdsale', (accounts) => {
    const investor = accounts[1];
    const wallet = accounts[2];
    const purchaser = accounts[3];
    const rate = new BigNumber(1000);
    const someValue = ether(42);

    const expectedTokenAmount = rate.mul(someValue);

    beforeEach(async () => {
        this.startBlock = web3.eth.blockNumber + 10;
        this.endBlock = web3.eth.blockNumber + 20;

        this.crowdsale = await Crowdsale.new(this.startBlock, this.endBlock, rate, wallet);

        this.token = MintableToken.at(await this.crowdsale.token());
    });

    it('should be token owner', async () => {
        const owner = await this.token.owner();
        owner.should.equal(this.crowdsale.address);
    });

    it('should be ended only after end', async () => {
        let ended = await this.crowdsale.hasEnded();
        ended.should.equal(false);
        await advanceToBlock(this.endBlock + 1);
        ended = await this.crowdsale.hasEnded();
        ended.should.equal(true);
    });

    describe('accepting payments', () => {
        it('should reject payments before start', async () => {
            await this.crowdsale.send(someValue).should.be.rejectedWith(EVMThrow);
            await this.crowdsale.buyTokens(investor, someValue, {
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);
        });

        it('should accept payments after start', async () => {
            await advanceToBlock(this.startBlock - 1);
            await this.crowdsale.send(someValue).should.be.fulfilled;
            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            }).should.be.fulfilled;
        });

        it('should reject payments after end', async () => {
            await advanceToBlock(this.endBlock);
            await this.crowdsale.send(someValue).should.be.rejectedWith(EVMThrow);
            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);
        });
    });

    describe('high-level purchase', () => {
        beforeEach(async () => {
            await advanceToBlock(this.startBlock);
        });

        it('should log purchase', async () => {
            const {
                logs,
            } = await this.crowdsale.sendTransaction({
                value: someValue,
                from: investor,
            });

            const event = logs.find(e => e.event === 'TokenPurchase');

            should.exist(event);
            event.args.purchaser.should.equal(investor);
            event.args.beneficiary.should.equal(investor);
            event.args.value.should.be.bignumber.equal(someValue);
            event.args.amount.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should increase totalSupply', async () => {
            await this.crowdsale.send(someValue);
            const totalSupply = await this.token.totalSupply();
            totalSupply.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should assign tokens to sender', async () => {
            await this.crowdsale.sendTransaction({
                value: someValue,
                from: investor,
            });
            const balance = await this.token.balanceOf(investor);
            balance.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should forward funds to wallet', async () => {
            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.sendTransaction({
                someValue,
                from: investor,
            });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(someValue);
        });
    });

    describe('low-level purchase', () => {
        beforeEach(async () => {
            await advanceToBlock(this.startBlock);
        });

        it('should log purchase', async () => {
            const {
                logs,
            } = await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            });

            const event = logs.find(e => e.event === 'TokenPurchase');

            should.exist(event);
            event.args.purchaser.should.equal(purchaser);
            event.args.beneficiary.should.equal(investor);
            event.args.value.should.be.bignumber.equal(someValue);
            event.args.amount.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should increase totalSupply', async () => {
            await this.crowdsale.buyTokens(investor, {
                someValue,
                from: purchaser,
            });
            const totalSupply = await this.token.totalSupply();
            totalSupply.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should assign tokens to beneficiary', async () => {
            await this.crowdsale.buyTokens(investor, {
                someValue,
                from: purchaser,
            });
            const balance = await this.token.balanceOf(investor);
            balance.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should forward funds to wallet', async () => {
            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.buyTokens(investor, {
                someValue,
                from: purchaser,
            });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(someValue);
        });
    });
});

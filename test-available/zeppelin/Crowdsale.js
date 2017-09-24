const {
    ether,
} = require('../helpers/ether');
const {
    increaseTimeTo, duration,
} = require('../helpers/increaseTime');
const {
    advanceBlock,
} = require('../helpers/advanceToBlock');
const {
    latestTime,
} = require('../helpers/latestTime');
const {
    EVMThrow,
} = require('../helpers/EVMThrow');

const {
    BigNumber,
} = web3;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Crowdsale = artifacts.require('zeppelin-solidity/contracts/crowdsale/Crowdsale');
const MintableToken = artifacts.require('zeppelin-solidity/contracts/token/MintableToken');

// function logBN(message, x) { console.log(message, x.toNumber()); }


contract('Crowdsale', (accounts) => {

    const investor = accounts[1];
    const wallet = accounts[2];
    const purchaser = accounts[3];
    const rate = new BigNumber(1000);
    const someValue = ether(42);

    const expectedTokenAmount = rate.mul(someValue);

    beforeEach(async () => {

        this.latestTime = await latestTime();
        await increaseTimeTo(this.latestTime + duration.days(1));
        this.latestTime = await latestTime();

        this.startTime = this.latestTime + duration.weeks(4);
        this.endTime = this.startTime + duration.weeks(1);

        // console.log('latestTime = ', this.latestTime);
        // console.log('startTime  = ', this.startTime);
        // console.log('endTime    = ', this.endTime);
        // console.log('rate       = ', rate.toNumber());
        // console.log('wallet     = ', wallet);

        this.crowdsale = await Crowdsale.new(
            this.startTime,
            this.endTime,
            rate,
            wallet
        );

        // logBN('creationTime = ', await this.crowdsale.cTime());
        // logBN('startTime    = ', await this.crowdsale.startTime());
        // logBN('endTime      = ', await this.crowdsale.endTime());
        // logBN('rate         = ', await this.crowdsale.rate());
        // console.log('wallet       = ', await this.crowdsale.wallet());
        // console.log('token        = ', await this.crowdsale.token());

        const tokenAddress = await this.crowdsale.token();
        this.token = await MintableToken.at(tokenAddress);

    });

    it('should be token owner', async () => {

        const owner = await this.token.owner();
        owner.should.equal(this.crowdsale.address);

    });

    it('should be ended only after end', async () => {

        let ended = await this.crowdsale.hasEnded();
        ended.should.equal(false);
        await increaseTimeTo(this.endTime + duration.minutes(1));

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

            await increaseTimeTo(this.startTime);
            await advanceBlock();
            await this.crowdsale.send(someValue).should.be.fulfilled;
            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            }).should.be.fulfilled;

        });

        it('should reject payments after end', async () => {

            await increaseTimeTo(this.endTime + duration.minutes(1));
            await advanceBlock();
            await this.crowdsale.send(someValue).should.be.rejectedWith(EVMThrow);
            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);

        });

    });

    describe('high-level purchase', () => {

        beforeEach(async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();

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
                value: someValue,
                from: investor,
            });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(someValue);

        });

    });

    describe('low-level purchase', () => {

        beforeEach(async () => {

            await increaseTimeTo(this.startTime);
            await advanceBlock();

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
                value: someValue,
                from: purchaser,
            });
            const totalSupply = await this.token.totalSupply();
            totalSupply.should.be.bignumber.equal(expectedTokenAmount);

        });

        it('should assign tokens to beneficiary', async () => {

            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            });
            const balance = await this.token.balanceOf(investor);
            balance.should.be.bignumber.equal(expectedTokenAmount);

        });

        it('should forward funds to wallet', async () => {

            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.buyTokens(investor, {
                value: someValue,
                from: purchaser,
            });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(someValue);

        });

    });

});

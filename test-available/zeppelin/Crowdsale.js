const {
    ether,
} = require('../helpers/ether');
const {
    duration,
} = require('../helpers/increaseTime');
const {
    advanceBlock,
} = require('../helpers/advanceToBlock');
const {
    latestTime,
} = require('../helpers/latestTime');
const {
    increaseTimeTo,
} = require('../helpers/increaseTime');
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

const Crowdsale = artifacts.require('Crowdsale');
const MintableToken = artifacts.require('MintableToken');

contract('Crowdsale', (accounts) => {

    const investor = accounts[1];
    const wallet = accounts[2];
    const purchaser = accounts[3];
    const rate = new BigNumber(1000);
    const someValue = ether(42);

    const expectedTokenAmount = rate.mul(someValue);

    beforeEach(async() => {

        this.startTime = latestTime() + duration.weeks(4);
        this.endTime = this.startTime + duration.weeks(1);

        console.log(web3.eth.blockNumber, latestTime(), this.startTime, this.endTime);

        this.crowdsale = await Crowdsale.new(
            this.startTime,
            this.endTime,
            rate,
            wallet,
        );

        console.log(latestTime());
        console.log(web3.eth.blockNumber);
        let testTime = await this.crowdsale.startTime();
        console.log('startTime:', testTime);
        testTime = await this.crowdsale.endTime();
        console.log('endTime:', testTime);
        testTime = await this.crowdsale.creationTime();
        console.log('creationTime:', testTime);

        const myEvents = this.crowdsale.allEvents({
            fromBlock: 0,
            toBlock: 'latest',
        });

        myEvents.get((error, logs) => {

            // we have the logs, now print them
            logs.forEach(log => console.log(log.args));

        });

        const tokenAddress = await this.crowdsale.token();

        console.log(this.crowdsale.address, tokenAddress);

    //    this.token = MintableToken.at(tokenAddress);

    });

    it('should be token owner', async () => {

        const tokenAddress = await this.crowdsale.token();
        console.log(this.crowdsale.address, tokenAddress);
        this.token = MintableToken.at(tokenAddress);

        const owner = await this.token.owner();
        owner.should.equal(this.crowdsale.address);

    });

    /*

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

    */

});
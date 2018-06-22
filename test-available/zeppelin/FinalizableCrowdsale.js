const { increaseTimeTo, } = require('../helpers/increaseTime');
const { advanceBlock, } = require('../helpers/advanceToBlock');
const { latestTime, } = require('../helpers/latestTime');
const { duration, } = require('../helpers/increaseTime');
const revert = require('../helpers/Revert');

const { BigNumber, } = web3;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const FinalizableCrowdsaleMock = artifacts.require('FinalizableCrowdsaleMock.sol');
const MintableToken = artifacts.require('MintableToken');

contract('FinalizableCrowdsale', (accounts) => {

    const owner = accounts[1];
    const wallet = accounts[2];
    const thirdparty = accounts[3];
    const rate = new BigNumber(1000);


    before(async () => {

        // Advance to the next block to correctly read time in
        // the solidity "now" function interpreted by Ganache
        await advanceBlock();

    });

    beforeEach(async () => {
        this.latestTime = await latestTime();
        this.startTime = this.latestTime + duration.years(4);
        this.endTime = this.startTime + duration.weeks(1);

        this.crowdsale = await FinalizableCrowdsaleMock.new(
            this.startTime,
            this.endTime,
            rate,
            wallet, {
                from: owner,
            }
        );

        const tokenAddress = await this.crowdsale.token();
        this.token = MintableToken.at(tokenAddress);

    });

    it('cannot be finalized before ending', async () => {

        await this.crowdsale.finalize({
            from: owner,
        }).should.be.rejectedWith(revert);

    });

    it('cannot be finalized by third party after ending', async () => {

        await increaseTimeTo(this.endTime);
        await advanceBlock();
        await this.crowdsale.finalize({
            from: thirdparty,
        }).should.be.rejectedWith(revert);

    });

    it('can be finalized by owner after ending', async () => {

        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();
        await this.crowdsale.finalize({
            from: owner,
        }).should.be.fulfilled;

    });

    it('cannot be finalized twice', async () => {

        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();
        await this.crowdsale.finalize({
            from: owner,
        });
        await this.crowdsale.finalize({
            from: owner,
        }).should.be.rejectedWith(revert);

    });

    it('logs finalized', async () => {

        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();
        const {
            logs,
        } = await this.crowdsale.finalize({
            from: owner,
        });
        const event = logs.find(e => e.event === 'Finalized');
        should.exist(event);

    });

    it('finishes minting of token', async () => {

        await increaseTimeTo(this.endTime + duration.minutes(5));
        await advanceBlock();
        await this.crowdsale.finalize({
            from: owner,
        });
        const finished = await this.token.mintingFinished();
        finished.should.equal(true);

    });

});

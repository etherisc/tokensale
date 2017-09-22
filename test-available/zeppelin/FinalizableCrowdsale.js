const { increaseTimeTo, } = require('../helpers/increaseTime');
const { advanceBlock, } = require('../helpers/advanceToBlock');
const { latestTime, } = require('../helpers/latestTime');
const { duration, } = require('../helpers/increaseTime');
const { EVMThrow, } = require('../helpers/EVMThrow');

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

    beforeEach(async () => {

        this.latestTime = latestTime();
        this.startTime = this.latestTime + duration.weeks(4);
        this.endTime = this.startTime + duration.weeks(1);
        console.log(this.latestTime, this.startTime, this.endTime);

        this.crowdsale = await FinalizableCrowdsaleMock.new(
            this.startTime,
            this.endTime,
            rate,
            wallet, {
                from: owner,
            }
        );

        const myEvents = this.crowdsale.allEvents({
            fromBlock: 0,
            toBlock: 'latest',
        });

        myEvents.get((error, logs) => {

            // we have the logs, now print them
            logs.forEach(log => console.log(log.args));

        });


        console.log(web3.eth.blockNumber, web3.eth.getBlock('latest').timestamp);

        console.log(this.crowdsale.address);
        let testTime = await this.crowdsale.startTime();
        console.log('startTime', testTime.toNumber());
        testTime = await this.crowdsale.endTime();
        console.log('endTime', testTime.toNumber());
        testTime = await this.crowdsale.creationTime();
        console.log('creationTime', testTime.toNumber());

        const tokenAddress = await this.crowdsale.token();
        console.log('tokenAddress', tokenAddress);
        this.token = MintableToken.at(tokenAddress);

    });

    it('cannot be finalized before ending', async () => {

        await this.crowdsale.finalize({
            from: owner,
        }).should.be.rejectedWith(EVMThrow);

    });

    it('cannot be finalized by third party after ending', async () => {

        await increaseTimeTo(this.endTime);
        await advanceBlock();
        await this.crowdsale.finalize({
            from: thirdparty,
        }).should.be.rejectedWith(EVMThrow);

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
        }).should.be.rejectedWith(EVMThrow);

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

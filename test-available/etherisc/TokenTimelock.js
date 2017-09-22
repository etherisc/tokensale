/**
 * [sleep description]
 * @param  {[type]} ms [description]
 * @return {[type]}    [description]
 */

const { BigNumber, } = web3;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();


const { EVMThrow, } = require('../helpers/EVMThrow');
const { increaseTimeTo, duration, } = require('../helpers/increaseTime');
const { latestTime, } = require('../helpers/latestTime');

const TokenTimelockMock = artifacts.require('TokenTimelockMock');
const SoftPausableTokenMock = artifacts.require('SoftPausableTokenMock');


contract('TokenTimelock', (accounts) => {

    const spender = accounts[1];
    const staker = accounts[2];
    const beneficiary = accounts[3];

    beforeEach(async () => {

        this.lockTime = latestTime() + duration.days(50);
        this.token = await SoftPausableTokenMock.new(spender, 100);
        this.tokenTimelock = await TokenTimelockMock.new(this.token.address);
        this.token.transfer(staker, 50, {
            from: spender,
        });

        await this.token.approve(this.tokenTimelock.address, 50, {
            from: spender,
        });

        await this.token.approve(this.tokenTimelock.address, 50, {
            from: staker,
        });


    });

    it('should set timelock from spender for staker', async () => {

        const result = await this.tokenTimelock.setTimelockFor(staker, this.lockTime, 20, {
            from: spender,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);
        event = result.logs.find(e => e.event === 'TimeLocked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenTimelock.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(spender);
        balance.should.be.bignumber.equal(30);

        const lockedTokens = await this.tokenTimelock.releaseTime(staker, this.lockTime);
        lockedTokens.should.be.bignumber.equal(20);

    });

    it('should set timelock from staker for staker', async () => {

        const result = await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);
        event = result.logs.find(e => e.event === 'TimeLocked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenTimelock.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(30);

        const lockedTokens = await this.tokenTimelock.releaseTime(staker, this.lockTime);
        lockedTokens.should.be.bignumber.equal(20);

    });

    it('should release timelock from staker for beneficiary', async () => {

        await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        });

        await increaseTimeTo(this.lockTime + duration.days(60));

        const result = await this.tokenTimelock.releaseTimelockFor(beneficiary, this.lockTime, 15, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Released');
        should.exist(event);
        event = result.logs.find(e => e.event === 'TimeUnlocked');
        should.exist(event);

        let balance = await this.token.balanceOf(beneficiary);
        balance.should.be.bignumber.equal(15);
        balance = await this.token.balanceOf(this.tokenTimelock.address);
        balance.should.be.bignumber.equal(5);

        const lockedTokens = await this.tokenTimelock.releaseTime(staker, this.lockTime);
        lockedTokens.should.be.bignumber.equal(5);

    });

    it('should release timelock from staker for staker', async () => {

        await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        });

        await increaseTimeTo(this.lockTime + duration.days(60));

        const result = await this.tokenTimelock.releaseTimelock(this.lockTime, 15, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Released');
        should.exist(event);
        event = result.logs.find(e => e.event === 'TimeUnlocked');
        should.exist(event);

        let balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(45);
        balance = await this.token.balanceOf(this.tokenTimelock.address);
        balance.should.be.bignumber.equal(5);

        const lockedTokens = await this.tokenTimelock.releaseTime(staker, this.lockTime);
        lockedTokens.should.be.bignumber.equal(5);

    });

    it('should throw if trying to release before releaseTime', async () => {


        await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        });

        await this.tokenTimelock.releaseTimelock(this.lockTime, 15, {
            from: staker,
        }).should.be.rejectedWith(EVMThrow);

        await this.tokenTimelock.releaseTimelockFor(beneficiary, this.lockTime, 15, {
            from: staker,
        }).should.be.rejectedWith(EVMThrow);

        let balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(30);
        balance = await this.token.balanceOf(this.tokenTimelock.address);
        balance.should.be.bignumber.equal(20);

        const lockedTokens = await this.tokenTimelock.releaseTime(staker, this.lockTime);
        lockedTokens.should.be.bignumber.equal(20);

    });

    it('should throw if token is paused during locking', async () => {

        await this.token.pause();

        await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        }).should.be.rejectedWith(EVMThrow);

        await this.tokenTimelock.setTimelockFor(beneficiary, this.lockTime, 20, {
            from: staker,
        }).should.be.rejectedWith(EVMThrow);

    });

    it('should return false if token is paused during unlocking', async () => {

        await this.tokenTimelock.setTimelock(this.lockTime, 20, {
            from: staker,
        }).should.be.fulfilled;

        await this.tokenTimelock.setTimelockFor(beneficiary, this.lockTime, 20, {
            from: staker,
        }).should.be.fulfilled;

        await this.token.pause();
        await increaseTimeTo(this.lockTime + duration.days(60));

        await this.tokenTimelock.releaseTimelock(this.lockTime, 15, {
            from: staker,
        }).should.be.fulfilled;
        let lastResult = await this.tokenTimelock.lastResult();
        lastResult.should.be.false; // eslint-disable-line no-unused-expressions

        await this.tokenTimelock.releaseTimelockFor(beneficiary, this.lockTime, 15, {
            from: staker,
        }).should.be.fulfilled;
        lastResult = await this.tokenTimelock.lastResult();
        lastResult.should.be.false; // eslint-disable-line no-unused-expressions

    });

});

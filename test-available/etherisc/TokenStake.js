/**
 * [sleep description]
 * @param  {[type]} ms [description]
 * @return {[type]}    [description]
 */
const { EVMThrow, } = require('../helpers/EVMThrow');

const { BigNumber, } = web3;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();


const TokenStakeMock = artifacts.require('TokenStakeMock');
const SoftPausableTokenMock = artifacts.require('SoftPausableTokenMock');


contract('TokenStakeMock', (accounts) => {

    const spender = accounts[1];
    const staker = accounts[2];
    const beneficiary = accounts[3];

    beforeEach(async () => {

        this.token = await SoftPausableTokenMock.new(spender, 100);
        this.tokenStake = await TokenStakeMock.new(this.token.address);
        this.token.transfer(staker, 50, {
            from: spender,
        });

    });

    it('should stake tokens from spender for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: spender,
        });

        const result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        const event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(spender);
        balance.should.be.bignumber.equal(30);

    });

    it('should add stake tokens from spender for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: spender,
        });

        let result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(40);
        balance = await this.token.balanceOf(spender);
        balance.should.be.bignumber.equal(10);

    });

    it('should stake tokens from staker for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        const result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        const event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(30);

    });

    it('should add stake tokens from staker for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        let result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(40);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(10);

    });

    it('should release staked tokens from staker for beneficiary', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: spender,
        });

        let result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doReleaseFor(beneficiary, 20, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(0);
        balance = await this.token.balanceOf(beneficiary);
        balance.should.be.bignumber.equal(20);

    });

    it('should partially release staked tokens from staker for beneficiary', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: spender,
        });

        let result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doReleaseFor(beneficiary, 10, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        result = await this.tokenStake.doReleaseFor(beneficiary, 10, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(0);
        balance = await this.token.balanceOf(beneficiary);
        balance.should.be.bignumber.equal(20);

    });

    it('should release staked tokens from staker for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        let result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doRelease(20, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(0);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(50);

    });

    it('should partially release staked tokens from staker for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        let result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        result = await this.tokenStake.doRelease(10, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        result = await this.tokenStake.doRelease(10, {
            from: staker,
        });
        event = result.logs.find(e => e.event === 'Released');
        should.exist(event);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(0);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(50);

    });

    it('should throw if trying to release more than staked tokens from staker for beneficiary', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: spender,
        });

        const result = await this.tokenStake.doStakeFor(staker, 20, {
            from: spender,
        });
        const event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        await this.tokenStake.doReleaseFor(beneficiary, 30, {
            from: staker,
        })
            .should.be.rejectedWith(EVMThrow);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(beneficiary);
        balance.should.be.bignumber.equal(0);

    });

    it('should throw if trying to release more than staked tokens from staker for staker', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        const result = await this.tokenStake.doStake(20, {
            from: staker,
        });
        const event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);

        await this.tokenStake.doRelease(30, {
            from: staker,
        })
            .should.be.rejectedWith(EVMThrow);

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(30);

    });

    it('should return false if transferFrom returns false during staking', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        await this.token.pause();

        await this.tokenStake.doStake(20, {
            from: staker,
        }).should.be.fulfilled;

        const lastResult = await this.tokenStake.lastResult();
        lastResult.should.be.false; // eslint-disable-line no-unused-expressions

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(0);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(50);

    });

    it('should return false if transfer returns false during releasing', async () => {

        await this.token.approve(this.tokenStake.address, 50, {
            from: staker,
        });

        await this.tokenStake.doStake(20, {
            from: staker,
        });

        await this.token.pause();

        await this.tokenStake.doRelease(20, {
            from: staker,
        }).should.be.fulfilled;

        const lastResult = await this.tokenStake.lastResult();
        lastResult.should.be.false; // eslint-disable-line no-unused-expressions

        let balance = await this.token.balanceOf(this.tokenStake.address);
        balance.should.be.bignumber.equal(20);
        balance = await this.token.balanceOf(staker);
        balance.should.be.bignumber.equal(30);

    });

});

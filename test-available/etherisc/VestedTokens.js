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
const { duration, } = require('../helpers/increaseTime');
const { latestTime, } = require('../helpers/latestTime');

const VestedTokens = artifacts.require('VestedTokens');
const SoftPausableTokenMock = artifacts.require('SoftPausableTokenMock');


contract('VestedTokens', (accounts) => {

    const spender = accounts[1];
    const beneficiary = accounts[3];

    beforeEach(async () => {

        this.token = await SoftPausableTokenMock.new(spender, 100);
        this.vestedTokens = await VestedTokens.new(this.token.address);

        await this.token.approve(this.vestedTokens.address, 100, {
            from: spender,
        });

    });

    it('should grant tokens for beneficiary', async () => {

        const startTime = latestTime() + duration.days(5);
        const cliff = duration.weeks(1);
        const vestingPeriod = duration.weeks(5);
        let lockTime = startTime;

        const result = await this.vestedTokens.grant(
            beneficiary,
            50,
            startTime,
            cliff,
            vestingPeriod,
            {
                from: spender,
            }
        );

        let event = result.logs.find(e => e.event === 'Staked');
        should.exist(event);
        event = result.logs.find(e => e.event === 'TimeLocked');
        should.exist(event);
        event = result.logs.find(e => e.event === 'GrantGiven');
        should.exist(event);

        let balance = await this.token.balanceOf(this.vestedTokens.address);
        balance.should.be.bignumber.equal(50);
        balance = await this.token.balanceOf(spender);
        balance.should.be.bignumber.equal(50);

        lockTime += cliff;
        let lockedTokens = await this.vestedTokens.releaseTime(beneficiary, lockTime);
        lockedTokens.should.be.bignumber.equal(10);
        lockTime += cliff;
        lockedTokens = await this.vestedTokens.releaseTime(beneficiary, lockTime);
        lockedTokens.should.be.bignumber.equal(10);
        lockTime += cliff;
        lockedTokens = await this.vestedTokens.releaseTime(beneficiary, lockTime);
        lockedTokens.should.be.bignumber.equal(10);
        lockTime += cliff;
        lockedTokens = await this.vestedTokens.releaseTime(beneficiary, lockTime);
        lockedTokens.should.be.bignumber.equal(10);
        lockTime += cliff;
        lockedTokens = await this.vestedTokens.releaseTime(beneficiary, lockTime);
        lockedTokens.should.be.bignumber.equal(10);

    });

    it('should throw if amount not divisible by periods', async () => {

        const startTime = latestTime() + duration.days(5);
        const cliff = duration.weeks(1);
        const vestingPeriod = duration.weeks(6);

        await this.vestedTokens.grant(
            beneficiary,
            50,
            startTime,
            cliff,
            vestingPeriod,
            {
                from: spender,
            }
        ).should.be.rejectedWith(EVMThrow);

    });


});

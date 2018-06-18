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

    const CAN_BUY = 0;
    const CAN_CONVERT_RSC = 1;
    const GETS_AIRDROP = 2;
    const INVALID_DISTRIBUTION = 10;

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

        this.rscToken = await StandardTokenMock.new(accounts[0], 100);

        this.crowdsale = await DipTge.new(
            this.startTime,
            this.startOpenPpTime,
            this.endTime,
            this.lockInTime1,
            this.lockInTime2,
            hardCap,
            rate,
            wallet,
            this.rscToken.address
        );

        const tokenAddress = await this.crowdsale.token();
        this.token = await DipToken.at(tokenAddress);
    });


    describe('whitelisting process', () => {

        let maxContrib;

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [
                    allowedInvestor
                ], [
                    allowance
                ], [
                    CAN_BUY
                ], [
                    BONUS_0
                ], [
                    LOCKUP_ZERO
                ],
                {
                gaslimit: 4700000,
            });

        });
    });
});

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
    const minCap = new BigNumber(100);
    const hardCap1 = new BigNumber(200);
    const hardCap2 = new BigNumber(300);
    const someValue = ether(42);

    const expectedTokenAmount = rate.mul(someValue);

    beforeEach(async () => {

        this.startBlock = web3.eth.blockNumber + 10;
        this.startOpenPpBlock = web3.eth.blockNumber + 20;
        this.startPublicBlock = web3.eth.blockNumber + 30;
        this.endBlock = web3.eth.blockNumber + 40;
        this.crowdsale = await DipTge.new(
            this.startBlock,
            this.startOpenPpBlock,
            this.startPublicBlock,
            this.endBlock,
            this.minCap,
            this.hardCap1,
            this.hardCap2,
            rate,
            wallet);
        this.token = DipToken.at(await this.crowdsale.token());

    });

    it('should have the token paused at start', async () => {

        const paused = await this.token.paused();
        paused.should.equal(true);

    });

    describe('whitelisting process', () => {

        // should whitelist participants by owner
        // should reject whitelist participants if not owner
        // should update participants by owner

    });

    describe('rejecting payments', () => {

        beforeEach(async () => {

            await this.crowdsale.editContributors(
                [ppInvestor, otherInvestor], [50, 0], [0, 50]);

        });

        it('should reject payments before start from anybody', async () => {

            await this.crowdsale.sendTransaction({
                from: anonInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(anonInvestor, someValue, {
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments before start from whitelisted PP participant', async () => {

            await this.crowdsale.sendTransaction({
                from: ppInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(ppInvestor, someValue, {
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);

        });

        it('should reject payments before start from whitelisted other participant', async () => {

            await this.crowdsale.sendTransaction({
                from: otherInvestor,
                value: someValue,
            }).should.be.rejectedWith(EVMThrow);

            await this.crowdsale.buyTokens(otherInvestor, someValue, {
                from: purchaser,
            }).should.be.rejectedWith(EVMThrow);

        });


        // should reject payments over allowance from whitelisted PP participant
        // should reject payments over allowance from whitelisted other participant
        // should reject payments after reaching hardCap1 from whitelisted PP participants
        // should reject payments after reaching hardCap1 from whitelisted other participants
        // should reject payments after reaching hardCap2 from whitelisted PP participants
        // should reject payments after reaching hardCap2 from whitelisted other participants
        // should partially accept payments if near hardCap1 for whitelisted PP participants
        // should partially accept payments if near hardCap1 for whitelisted other participants
        // should partially accept payments if near hardCap2 for whitelisted PP participants
        // should partially accept payments if near hardCap2 for whitelisted other participants

    });

    describe('high-level purchase', () => {

        beforeEach(async () => {

            await advanceToBlock(this.startBlock);

        });

    // should accept allowed payments from PP Participants
    // should accept allowed payments from other Participants
    // should accept higher payments after startOpenPpBlock from PP Participants
    // should accept higher payments after startOpenPpBlock from other Participants
    // should accept payments after startPublicBlock from any Participants

    });

    describe('low-level purchase', () => {

        beforeEach(async () => {

            await advanceToBlock(this.startBlock);

        });

    // see above

    });

    describe('finalization', () => {

    // should mint remaining tokens to ...
    // should finish minting

    });

    describe('salvage Tokens', () => {

    // should salvage tokens

    });

});

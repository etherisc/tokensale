const { EVMThrow, } = require('../helpers/EVMThrow');

const { BigNumber, } = web3;

const DipTokenMock = artifacts.require('DipTokenMock');
const DipToken = artifacts.require('DipToken');


const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('DipTokenMock', (accounts) => {

    let mock;
    let token;

    beforeEach(async () => {

        mock = await DipTokenMock.new();
        token = DipToken.at(await mock.token());

    });

    it('should be constructed with the correct parameters', async () => {

        const name = await token.name();
        name.should.be.equal('Decentralized Insurance Protocol');

        const symbol = await token.symbol();
        symbol.should.be.equal('DIP');

        const decimals = await token.decimals();
        decimals.should.be.bignumber.equal(18);

        const maxSupply = await token.MAXIMUM_SUPPLY();
        maxSupply.should.be.bignumber.equal(new BigNumber('1e+9').mul(new BigNumber('1e+18')));

    });


    it('should reject minting more than MAXIMUM_SUPPLY', async () => {

        const maxSupply = await token.MAXIMUM_SUPPLY();

        await mock.mint(accounts[0], maxSupply);
        let result = await mock.result();
        assert.equal(result, true);

        await mock.mint(accounts[0], 1);
        result = await mock.result();
        assert.equal(result, false);

    });

    // todo: fix

    // it('should salvage tokens which have been sent to contract by mistake', async () => {
    //
    //     await mock.mint(accounts[1], 10).should.be.fulfilled;
    //
    //     await token.transfer(token.address, 5, {
    //         from: accounts[1],
    //     }).should.be.fulfilled;
    //
    //     await mock.salvageTokens(token.address, accounts[1])
    //         .should.be.fulfilled;
    //
    //     const balance = await token.balanceOf(accounts[1]);
    //     balance.should.be.bignumber.equal(10);
    //
    // });
    //
    // it('should reject calling salvageTokens by non-owner', async () => {
    //
    //     await mock.mint(accounts[1], 10).should.be.fulfilled;
    //
    //     await token.transfer(token.address, 5, {
    //         from: accounts[1],
    //     }).should.be.fulfilled;
    //
    //     await token.salvageTokens(token.address, accounts[1], {
    //         from: accounts[2],
    //     }).should.be.rejectedWith(EVMThrow);
    //
    // });

});

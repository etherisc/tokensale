const DipTokenMock = artifacts.require('DipTokenMock');
const DipToken = artifacts.require('DipToken');

const BigNumber = web3.BigNumber;

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
        name.should.be.equal('DecentralizedInsurance');

        const symbol = await token.symbol();
        symbol.should.be.equal('DIP');

        const decimals = await token.decimals();
        decimals.should.be.bignumber.equal(18);

        const maxSupply = await token.MAXIMUM_SUPPLY();
        maxSupply.should.be.bignumber.equal(new BigNumber('1e+11').mul(new BigNumber('1e+18')));

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

    it('should salvage tokens which have been sent to contract by mistake', async () => {

        await mock.mint(accounts[1], 10);
        result = await mock.result();
        assert.equal(result, false);

        await this.token.transfer(this.token.address, 5, {
            from: accounts[1],
        }).should.be.fulfilled;

        await this.token.salvageTokens(this.token.address, account[1])
            .should.be.fulfilled;

        const balance = await this.token.balanceOf(account[1]);
        balance.should.be.bignumber.equal(10);

    });

});

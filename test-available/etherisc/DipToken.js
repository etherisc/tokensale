const DipTokenMock = artifacts.require('DipTokenMock');
const DipToken = artifacts.require('DipToken');

contract('DipTokenMock', (accounts) => {

    let mock;
    let token;

    beforeEach(async () => {

        mock = await DipTokenMock.new();
        token = DipToken.at(await mock.token());

    });

    it('should be constructed with the correct parameters', async () => {

        const name = await token.name();
        assert.equal(name, 'DecentralizedInsurance');

        const symbol = await token.symbol();
        assert.equal(symbol, 'DIP');

        const decimals = await token.decimals();
        assert.equal(decimals, 18);

        const maxSupply = await token.MAXIMUM_SUPPLY();
        assert.equal(maxSupply, 100000000);

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

});

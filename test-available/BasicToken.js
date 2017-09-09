const assertJump = require('./helpers/assertJump');

const BasicTokenMock = artifacts.require('./helpers/BasicTokenMock.sol');

contract('BasicToken', (accounts) => {
    it('should return the correct totalSupply after construction', async () => {
        const token = await BasicTokenMock.new(accounts[0], 100);
        const totalSupply = await token.totalSupply();

        assert.equal(totalSupply, 100);
    });

    it('should return correct balances after transfer', async () => {
        const token = await BasicTokenMock.new(accounts[0], 100);
        await token.transfer(accounts[1], 100);

        const firstAccountBalance = await token.balanceOf(accounts[0]);
        assert.equal(firstAccountBalance, 0);

        const secondAccountBalance = await token.balanceOf(accounts[1]);
        assert.equal(secondAccountBalance, 100);
    });

    it('should throw an error when trying to transfer more than balance', async () => {
        const token = await BasicTokenMock.new(accounts[0], 100);
        try {
            await token.transfer(accounts[1], 101);
        } catch (error) {
            return assertJump(error);
        }
        assert.fail('should have thrown before');
    });
});

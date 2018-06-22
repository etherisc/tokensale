const assertRevert = require('../helpers/assertRevert').assertRevert;

const PausabconstokenMock = artifacts.require('../helpers/PausableTokenMock.sol');

contract('Pausabletoken', (accounts) => {

    let token;

    beforeEach(async () => {

        token = await PausabconstokenMock.new(accounts[0], 100);

    });

    it('should return paused false after construction', async () => {

        const paused = await token.paused();

        assert.equal(paused, false);

    });

    it('should return paused true after pause', async () => {

        await token.pause();
        const paused = await token.paused();

        assert.equal(paused, true);

    });

    it('should return paused false after pause and unpause', async () => {

        await token.pause();
        await token.unpause();
        const paused = await token.paused();

        assert.equal(paused, false);

    });

    it('should be able to transfer if transfers are unpaused', async () => {

        await token.transfer(accounts[1], 100);
        const balance0 = await token.balanceOf(accounts[0]);
        assert.equal(balance0, 0);

        const balance1 = await token.balanceOf(accounts[1]);
        assert.equal(balance1, 100);

    });

    it('should be able to transfer after transfers are paused and unpaused', async () => {

        await token.pause();
        await token.unpause();
        await token.transfer(accounts[1], 100);
        const balance0 = await token.balanceOf(accounts[0]);
        assert.equal(balance0, 0);

        const balance1 = await token.balanceOf(accounts[1]);
        assert.equal(balance1, 100);

    });

    it('should throw an error trying to transfer while transactions are paused', async () => {

        await token.pause();
        try {

            await token.transfer(accounts[1], 100);

        } catch (error) {

            assertRevert(error);
            return;

        }
        assert.fail('should have thrown before');

    });

    it('should throw an error trying to transfer from another account while transactions are paused', async () => {

        await token.pause();
        try {

            await token.transferFrom(accounts[0], accounts[1], 100);

        } catch (error) {

            assertRevert(error);
            return;

        }
        assert.fail('should have thrown before');

    });

});

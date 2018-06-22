const assertJump = require('../helpers/assertJump').assertJump;
const assertRevert = require('../helpers/assertRevert').assertRevert;

const SafeMathMock = artifacts.require('../helpers/SafeMathMock.sol');

contract('SafeMath', (accounts) => {

    let safeMath;

    before(async () => {

        safeMath = await SafeMathMock.new();

    });

    it('multiplies correctly', async () => {

        const a = 5678;
        const b = 1234;
        await safeMath.multiply(a, b);
        const result = await safeMath.result();
        assert.equal(result, a * b);

    });

    it('adds correctly', async () => {

        const a = 5678;
        const b = 1234;
        await safeMath.add(a, b);
        const result = await safeMath.result();

        assert.equal(result, a + b);

    });

    it('subtracts correctly', async () => {

        const a = 5678;
        const b = 1234;
        await safeMath.subtract(a, b);
        const result = await safeMath.result();

        assert.equal(result, a - b);

    });

    it('should throw an error if subtraction result would be negative', async () => {

        const a = 1234;
        const b = 5678;
        try {

            await safeMath.subtract(a, b);

        } catch (error) {

            assertJump(error);
            return;

        }
        assert.fail('should have thrown before');

    });

    it('should throw an error on addition overflow', async () => {

        const a = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
        const b = 1;
        try {

            await safeMath.add(a, b);

        } catch (error) {

            assertRevert(error);
            return;

        }
        assert.fail('should have thrown before');

    });

    it('should throw an error on multiplication overflow', async () => {

        const a = 115792089237316195423570985008687907853269984665640564039457584007913129639933;
        const b = 2;
        try {

            await safeMath.multiply(a, b);

        } catch (error) {

            assertRevert(error);
            return;

        }
        assert.fail('should have thrown before');

    });

});

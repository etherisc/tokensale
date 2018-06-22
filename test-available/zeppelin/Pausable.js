const assertRevert = require('../helpers/assertRevert').assertRevert;

const PausableMock = artifacts.require('../helpers/PausableMock.sol');

contract('Pausable', (accounts) => { // eslint-disable-line no-unused-variables

    it('can perform normal process in non-pause', async () => {

        const Pausable = await PausableMock.new();
        const count0 = await Pausable.count();
        assert.equal(count0, 0);

        await Pausable.normalProcess();
        const count1 = await Pausable.count();
        assert.equal(count1, 1);

    });

    it('can not perform normal process in pause', async () => {

        const Pausable = await PausableMock.new();
        await Pausable.pause();
        const count0 = await Pausable.count();
        assert.equal(count0, 0);

        try {

            await Pausable.normalProcess();

        } catch (error) {

            assertRevert(error);
            return;

        }
        const count1 = await Pausable.count();
        assert.equal(count1, 0);

    });


    it('can not take drastic measure in non-pause', async () => {

        const Pausable = await PausableMock.new();
        try {

            await Pausable.drasticMeasure();

        } catch (error) {

            assertRevert(error);
            return;

        }

        const drasticMeasureTaken = await Pausable.drasticMeasureTaken();
        assert.isFalse(drasticMeasureTaken);

    });

    it('can take a drastic measure in a pause', async () => {

        const Pausable = await PausableMock.new();
        await Pausable.pause();
        await Pausable.drasticMeasure();
        const drasticMeasureTaken = await Pausable.drasticMeasureTaken();

        assert.isTrue(drasticMeasureTaken);

    });

    it('should resume allowing normal process after pause is over', async () => {

        const Pausable = await PausableMock.new();
        await Pausable.pause();
        await Pausable.unpause();
        await Pausable.normalProcess();
        const count0 = await Pausable.count();

        assert.equal(count0, 1);

    });

});

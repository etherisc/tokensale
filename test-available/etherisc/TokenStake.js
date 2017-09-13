/**
 * [sleep description]
 * @param  {[type]} ms [description]
 * @return {[type]}    [description]
 */
function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const TokenStakeMock = artifacts.require('../etherisc/TokenStakeMock');
const StandardTokenMock = artifacts.require('../helpers/StandardTokenMock');


contract('TokenStakeMock', (accounts) => {

    const owner = accounts[0];
    const spender = accounts[1];
    const staker = accounts[2];

    beforeEach(async () => {

        this.token = await StandardTokenMock.new(owner, 100);
        this.tokenStake = await TokenStakeMock.new(this.token.address);

    });

    it('should stake tokens from spender for staker', async () => {

        await this.token.approve(spender, 50, {
            from: owner,
        });
        await this.tokenStake.doStake(spender, staker, 20)
            .should.be.fulfilled;

    });

    it('should stake tokens from staker for staker', async () => {

        await this.token.approve(staker, 50, {
            from: owner,
        });
        await this.tokenStake.doStake(staker, staker, 20)
            .should.be.fulfilled;

    });

});

/**
 * [sleep description]
 * @param  {[type]} ms [description]
 * @return {[type]}    [description]
 */

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const EVMThrow = require('../helpers/EVMThrow').EVMThrow;

const MappingTest = artifacts.require('MappingTest');


contract('MappingTest', (accounts) => {

    beforeEach(async () => {

        this.mappingTest = await MappingTest.new();

    });

    it('should set mapping', async () => {

        let value = await this.mappingTest.myMapping(1, 2);
        value.should.be.bignumber.equal(3);

        value = await this.mappingTest.myMapping(3, 4);
        value.should.be.bignumber.equal(0);

    });

});

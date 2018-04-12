const BigNumber = require('bignumber.js');


module.exports = value =>
    new BigNumber(value).times(new BigNumber(1000000000000000000)).toString();

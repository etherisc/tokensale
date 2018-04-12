import { BigNumber } from 'bignumber.js';


module.exports = value =>
    new BigNumber(value).times(new BigNumber(1000000000000000000));

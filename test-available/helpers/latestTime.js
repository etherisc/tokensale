const moment = require('moment');

// 
/**
 * Returns a moment.js instance representing the time of the last mined block
 * @return {[type]} [description]
 */
function latestTime() {

    return moment.unix(web3.eth.getBlock('latest').timestamp);

}

module.exports = {
    latestTime,
};

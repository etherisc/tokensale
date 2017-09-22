/**
 * Increases testrpc time by the passed duration (a moment.js instance)
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */

const { latestTime, } = require('./latestTime');

/**
 * [increaseTime description]
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
function increaseTime(duration) {

    const idnow = Date.now();

    //console.log('IncreaseTime', web3.eth.blockNumber, web3.eth.getBlock('latest').timestamp, web3.eth.getBlock(web3.eth.blockNumber).timestamp);

    return new Promise((resolve, reject) => {

        web3.currentProvider.sendAsync({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            params: [duration],
            id: idnow,
        }, (err1) => {

            if (err1) return reject(err1);

            web3.currentProvider.sendAsync({
                jsonrpc: '2.0',
                method: 'evm_mine',
                id: idnow + 1,

            }, (err2, res) => {

      //          console.log('After: ', web3.eth.blockNumber, web3.eth.getBlock('latest').timestamp, web3.eth.getBlock(web3.eth.blockNumber).timestamp);
                (err2 ? reject(err2) : resolve(res));

            });

        });

    });

}

/**
 * Beware that due to the need of calling two separate testrpc methods and rpc calls overhead
 * it's hard to increase time precisely to a target point so design your test to tolerate
 * small fluctuations from time to time.
 *
 * @param target time in seconds
 */
function increaseTimeTo(target) {

    const now = latestTime();
    if (target < now) throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
    const diff = target - now;
    return increaseTime(diff);

}

const duration = {
    seconds(val) {

        return val;

    },
    minutes(val) {

        return val * this.seconds(60);

    },
    hours(val) {

        return val * this.minutes(60);

    },
    days(val) {

        return val * this.hours(24);

    },
    weeks(val) {

        return val * this.days(7);

    },
    years(val) {

        return val * this.days(365);

    },
};

module.exports = { increaseTime, increaseTimeTo, duration, };

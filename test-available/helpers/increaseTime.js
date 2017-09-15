/**
 * Increases testrpc time by the passed duration (a moment.js instance)
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
function increaseTime(duration) {

    const idnow = Date.now();

    return new Promise((resolve, reject) => {

        web3.currentProvider.sendAsync({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            params: [duration.asSeconds()],
            id: idnow,
        }, (err1) => {

            if (err1) return reject(err1);

            web3.currentProvider.sendAsync({
                jsonrpc: '2.0',
                method: 'evm_mine',
                id: idnow + 1,

            }, (err2, res) => {

                return err2 ? reject(err2) : resolve(res);

            });

        });

    });

}

module.exports = { increaseTime, };

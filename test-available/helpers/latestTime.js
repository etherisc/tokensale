/**
 * Returns last blocks timestamp
 */
function latestTime() {

    return new Promise((resolve, reject) =>

        web3.eth.getBlock('latest', (err, res) =>

            (err ? reject(err) : resolve(res.timestamp))

        )

    );

}

module.exports = {
    latestTime,
};

/**
 * Returns last blocks timestamp
 */
function latestTime() {

    // console.log(web3.eth.blockNumber, web3.eth.getBlock(web3.eth.blockNumber).timestamp, web3.eth.getBlock('latest').timestamp);
    return web3.eth.getBlock(web3.eth.blockNumber).timestamp;

}

module.exports = {
    latestTime,
};

/**
 * [ether description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function ether(n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}
module.exports = { ether, };

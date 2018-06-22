/**
 * Generate an Ether value
 * @param  {integer} n Number of ether to generate.
 * @return {BigNumber} BigNumber representing the Ether value.  
 */
function ether(n) {

    return new web3.BigNumber(web3.toWei(n, 'ether'));

}

module.exports = { ether, };

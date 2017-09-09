const DIP_Token = artifacts.require('./token/DIP_Token.sol'); // eslint-disable-line camelcase

module.exports = function (deployer) {

    deployer.deploy(DIP_Token);

};

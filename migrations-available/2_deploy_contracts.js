const DipToken = artifacts.require('./token/DipToken.sol');

module.exports = (deployer) => {

    deployer.deploy(DipToken);

};

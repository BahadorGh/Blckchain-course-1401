const contacts = artifacts.require('Contacts');

module.exports = function(deployer) {
    deployer.deploy(contacts);
}
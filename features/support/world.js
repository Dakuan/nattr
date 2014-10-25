var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function () {
    this.World = function World(callback) {
        this.expect = chai.expect
        callback();
    };
}

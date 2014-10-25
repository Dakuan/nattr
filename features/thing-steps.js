module.exports = function () {
    this.Given(/^this is the first sample$/, function (callback) {
        browser.get('http://juliemr.github.io/protractor-demo/');
        callback();
    });

    this.Given(/^this is the second sample$/, function (callback) {
        this.expect(browser.getTitle()).to.eventually.equal('Super Calculator');
        callback();
    });
};

var twitterParserPath = '../../app/util/parsers/twitter-parser';
jest.dontMock(twitterParserPath);
var subject = require(twitterParserPath);


describe('TwitterParser', function () {
    
    describe('#isHash', function () {
        it('should return true with valid hash tags', function () {
            expect(subject.isHash('#pizza')).toBeTruthy();
        });
        it('should return false with invalid hash tags', function () {
            expect(subject.isHash('pizza')).toBeFalsy();
            expect(subject.isHash('#')).toBeFalsy();
        });
    });

    describe('#isHandle', function () {
        it('should return true with valid handle', function () {
            expect(subject.isHandle('@pizza')).toBeTruthy();
        });
        it('should return false with invalid handle', function () {
            expect(subject.isHandle('pizza')).toBeFalsy();
            expect(subject.isHandle('@')).toBeFalsy();
        });
    });
});

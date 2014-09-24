var urlParserPath = '../../app/util/parsers/url-parser';
jest.dontMock(urlParserPath);
var subject = require(urlParserPath);


describe('UrlParser', function () {

    describe('#isUrl', function () {
        it('should return true with valid urls', function () {
            expect(subject.isUrl('http://www.thing.com')).toBeTruthy();
            expect(subject.isUrl('https://www.thing.com')).toBeTruthy();
            expect(subject.isUrl('https://www.thing.london')).toBeTruthy();
            expect(subject.isUrl('https://thing.london')).toBeTruthy();
        });
        it('should return false with invalid urls', function () {
            expect(subject.isUrl('htt://www.thing.com')).toBeFalsy();
            expect(subject.isUrl('no')).toBeFalsy();
        });
    });
});

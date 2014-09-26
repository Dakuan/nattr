var twitterUrlPath = '../../app/util/urls/twitter-urls';
jest.dontMock(twitterUrlPath);
var subject = require(twitterUrlPath);


describe('TwitterParser', function () {
    describe('#handleUrl', function () {
        var handle = '@mostlyharmlessd';
        it('should add the handle to the url', function () {
            expect(subject.handleUrl(handle)).toContain('mostlyharmlessd');
        });
        it('should remove the @ symbol', function () {
            expect(subject.handleUrl(handle)).not.toContain('@');
        });
        it('should remove trailing colons', function () {
            expect(subject.handleUrl(handle + '')).not.toMatch(/:$/);
        });
        it('should remove punctuation', function () {
            expect(subject.handleUrl(handle + '...')).not.toContain('...');
        });
    });

    describe('#hashTagUrl', function () {
        var tag = '#pizza';
        it('should add the hashtag to the url', function () {
            expect(subject.hashTagUrl(tag)).toContain('pizza');
        });
        it('should remove the # symbol', function () {
            expect(subject.hashTagUrl(tag)).not.toContain('#');
        });
    });
});

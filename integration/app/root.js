var request = require('supertest'),
    cheerio = require('cheerio'),
    sig = require('cookie-signature'),
    MongoClient = require('mongodb').MongoClient,
    CONFIG = require('../../app/server/config/config'),
    mockSessionId = '1234',
    app = require('../../app/server/app');


var spoofSession = {
    cookie: {
        originalMaxAge: null,
        expires: null,
        httpOnly: true,
        path: "/"
    },
    passport: {
        user: {
            __v: 0,
            name: 'TestTwitter',
            avatar: 'http://pbs.twimg.com/profile_images/6666/ThumbNailPlaceHolder_normal.png',
            _id: '543b73096b63db0000147c99',
            twitter: {
                id: '666',
                token: '666-666666',
                displayName: 'TestTwitter',
                username: 'TestTwitter'
            }
        }
    }
};


function _buildSessionCookie(sessionId) {
    return 'connect.sid=s:' + sig.sign(sessionId, CONFIG.get('session_secret'))
};

describe('GET /', function () {

    beforeEach(function (done) {
        MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
            if (err) {
                throw err;
            }
            db.collection('sessions').insert({
                _id: mockSessionId,
                session: JSON.stringify(spoofSession)
            }, function () {
                db.close();
                done();
            });
        });
    });

    afterEach(function (done) {
        MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
            if (err) {
                throw err;
            }
            db.collection('sessions').drop(done);
        });
    });

    describe('no session', function () {
        it('should redirect to the login page', function (done) {
            request(app)
                .get('/')
                .expect(302, done);
        });
    });

    describe('valid session', function () {
        it('should return 200', function (done) {
            request(app)
                .get('/')
                .set('Cookie', [_buildSessionCookie(mockSessionId)])
                .expect(200, done)
        });
        it('should render the update screen', function (done) {
            request(app)
                .get('/')
                .set('Cookie', [_buildSessionCookie(mockSessionId)])
                .expect(function (res) {
                    var $ = cheerio.load(res.text);
                    if (!($('h1').text() === 'nattr')) return 'not the update screen'
                })
                .end(done);
        });
    });

});

var request = require('supertest'),
    cheerio = require('cheerio'),
    sig = require('cookie-signature'),
    MongoClient = require('mongodb').MongoClient,
    app = require('../../app/server/app');

describe('GET /', function () {

    beforeEach(function (done) {
        MongoClient.connect(process.env.mongo_url, function (err, db) {
            if (err) {
                throw err;
            }
            db.collection('sessions').insert({
                _id: "1234",
                session: "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"__v\":0,\"name\":\"RiftData\",\"avatar\":\"http://pbs.twimg.com/profile_images/1562187133/ThumbNailPlaceHolder_normal.png\",\"_id\":\"543b73096b63db0000147c99\",\"twitter\":{\"id\":\"380849324\",\"token\":\"380849324-ozC8jn6dxGyftRN80GxZJiU31Kz75W4C3f4N9dBL\",\"displayName\":\"RiftData\",\"username\":\"RiftData\"}}}}"
            }, function () {
                db.close();
                done();
            });
        });
    });
    afterEach(function (done) {
        MongoClient.connect(process.env.mongo_url, function (err, db) {
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
                .set('Cookie', ['connect.sid=s:' + sig.sign('1234', 'rawr')])
                .expect(200, done)
        });
        it('should render the update screen', function (done) {
            request(app)
                .get('/')
                .set('Cookie', ['connect.sid=s:' + sig.sign('1234', 'rawr')])
                .expect(function (res) {
                    var $ = cheerio.load(res.text);
                    if (!($('h1').text() === 'nattr')) return 'not the update screen'
                })
                .end(done);
        });
    });

});

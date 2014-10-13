var request = require('supertest'),
    cheerio = require('cheerio'),
    MongoClient = require('mongodb').MongoClient,
    moment = require('moment'),
    app = require('../../app/server/app');

describe('GET /admin', function () {
    describe('no credentials', function () {
        it('should 401', function (done) {
            request(app)
                .get('/admin')
                .expect(401, done);
        });
    });

    describe('correct credentials', function () {
        it('should render the admin screen', function (done) {
            request(app)
                .get('/admin')
                .auth('test_admin', 'test_pass')
                .expect(function (res) {
                    var $ = cheerio.load(res.text)
                    if (!($('h1', '.page-header').text() === 'Admin')) return 'not the admin screen'
                })
                .end(done);
        });
    });

});

process.env.NODE_ENV = 'test';
process.env.mongo_url = 'mongodb://localhost/nattr_test';
process.env.admin_user_name = 'test_admin';
process.env.admin_user_password = 'test_pass';
process.env.twitter_consumer_key = "a";
process.env.twitter_consumer_secret = "a";
process.env.twitter_token = "a";
process.env.twitter_token_secret = "a";

var request = require('supertest'),
    MongoClient = require('mongodb').MongoClient,
    credentials = [process.env.admin_user_name, process.env.admin_user_password],
    app = require('../../app/server/app');

describe('/twitter', function () {

    describe('GET /users/following', function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/twitter/users/following')
                .auth('test_admin', 'test_pass')
                .expect(200, done);
        });

        it('should be authenticated', function (done) {
            request(app)
                .get('/api/twitter/users/following')
                .expect(401, done);
        });
    });

    describe('GET /users/search', function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/twitter/users/search?name=dom')
                .auth('test_admin', 'test_pass')
                .expect(200, done);
        });

        it('should be authenticated', function (done) {
            request(app)
                .get('/api/twitter/users/search?name=dom')
                .expect(401, done);
        });

        describe('if there is no search fragment', function () {
            it('should return 400', function (done) {
                request(app)
                    .get('/api/twitter/users/search')
                    .auth('test_admin', 'test_pass')
                    .expect(400, done);
            });
        });
    });

    describe('POST /users/following', function () {
        it('should return 201', function (done) {
            request(app)
                .post('/api/twitter/users/following')
                .send({})
                .auth('test_admin', 'test_pass')
                .expect(201, done);
        });

        it('should be authenticated', function (done) {
            request(app)
                .post('/api/twitter/users/following')
                .expect(401, done);
        });
    });

    describe('DELETE /users/following/:id', function () {

        before(function (done) {
            MongoClient.connect(process.env.mongo_url, function (err, db) {
                if (err) {
                    throw err;
                }
                db.collection('following').insert({
                    id_str: "1"
                }, function () {
                    db.close();
                    done();
                });
            });
        });

        it('should return 204', function (done) {
            request(app)
                .delete('/api/twitter/users/following/1')
                .auth('test_admin', 'test_pass')
                .expect(204, done);
        });

        it('should be authenticated', function (done) {
            request(app)
                .delete('/api/twitter/users/following/1')
                .expect(401, done);
        });

        describe('if there is no following user matching that id', function () {
            it('should return 404', function (done) {
                request(app)
                    .delete('/api/twitter/users/following/666')
                    .auth('test_admin', 'test_pass')
                    .expect(404, done);
            });
        });
    });
});

var request = require('supertest'),
    MongoClient = require('mongodb').MongoClient,
    credentials = [process.env.admin_user_name, process.env.admin_user_password],
    app = require('../../app/server/app');

describe('/twitter', function () {

    after(function (done) {
        MongoClient.connect(process.env.mongo_url, function (err, db) {
            if (err) {
                throw err;
            }
            db.collection('following').drop(done);
        });
    });

    describe('GET /users/following', function () {
        it('should return 200', function (done) {

            var res = request(app)
                .get('/api/twitter/users/following');
            res.auth.apply(res, credentials)
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
            var res = request(app)
                .get('/api/twitter/users/search?name=dom');
            res.auth.apply(res, credentials)
                .expect(200, done);
        });

        it('should be authenticated', function (done) {
            request(app)
                .get('/api/twitter/users/search?name=dom')
                .expect(401, done);
        });

        describe('if there is no search fragment', function () {
            it('should return 400', function (done) {
                var res = request(app)
                    .get('/api/twitter/users/search');
                res.auth.apply(res, credentials)
                    .expect(400, done);
            });
        });
    });

    describe('POST /users/following', function () {
        it('should return 201', function (done) {
            var res = request(app)
                .post('/api/twitter/users/following')
                .send({});
            res.auth.apply(res, credentials)
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
        it('should be authenticated', function (done) {
            request(app)
                .delete('/api/twitter/users/following/1')
                .expect(401, done);
        });

        it('should return 204', function (done) {
            var res = request(app)
                .delete('/api/twitter/users/following/1');
            res.auth.apply(res, credentials)
                .expect(204, done);
        });

        describe('if there is no following user matching that id', function () {
            it('should return 404', function (done) {

                var res = request(app)
                    .delete('/api/twitter/users/following/666');
                res.auth.apply(res, credentials)
                    .expect(404, done);
            });
        });
    });
});

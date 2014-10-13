var request = require('supertest'),
    cheerio = require('cheerio'),
    app = require('../../app/server/app');
describe('GET /login', function () {

    it('should return 200', function (done) {
        request(app)
            .get('/login')
            .expect(200, done);
    });

    it('should render the login page', function (done) {
        request(app)
            .get('/login')
            .expect(function (res) {
                var $ = cheerio.load(res.text);
                if (!($('h1.login-title').text() === 'Login')) return 'not the login screen'
            })
            .end(done);
    });
});

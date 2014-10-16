var express = require('express'),
    twitter = require('twitter'),
    Following = require('../../data/followers-data'),
    CONFIG = require('../../config/config'),
    _ = require('underscore'),
    basicAuth = require('../../middleware/basic-auth'),
    root = express.Router();

var twit = new twitter({
    consumer_key: CONFIG.get('twitter_consumer_key'),
    consumer_secret: CONFIG.get('twitter_consumer_secret'),
    access_token_key: CONFIG.get('twitter_token'),
    access_token_secret: CONFIG.get('twitter_token_secret')
});

function _err(res, prom) {
    prom.catch(function () {
        res.status(500);
    });
}

root.use(basicAuth);

root.get('/users/following', function (req, res, next) {
    Following.findAll().then(function (following) {
        res.json(following);
    });
});

root.get('/users/search', function (req, res, next) {
    var fragment = req.query.name;
    if (fragment) {
        twit.searchUser(fragment, {}, function (users) {
            var users = _.isArray(users) ? users : [];
            res.json(users);
        });
    } else {
        res.status(400);
        res.end();
    }
});

root.post('/users/following', function (req, res, next) {
    var user = req.body;
    q = Following.follow(user)
        .then(function (docs) {
            res.status(201);
            res.json(docs);
        })
    _err(res, q);
});

root.delete('/users/following/:id', function (req, res, next) {
    q = Following.unFollow(req.params.id)
        .then(function (user) {
            if (user) {
                res.status(204);
            } else {
                res.status(404);
            }

            res.end();
        });
    _err(res, q);
});

module.exports = root;

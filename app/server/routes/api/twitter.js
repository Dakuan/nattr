var express = require('express'),
    twitter = require('twitter'),
    Following = require('../../data/followers-data'),
    CONFIG = require('../../config/config'),
    basicAuth = require('../../middleware/basic-auth'),
    root = express.Router();

var twit = new twitter({
    consumer_key: CONFIG.get('twitter_consumer_key'),
    consumer_secret: CONFIG.get('twitter_consumer_secret'),
    access_token_key: CONFIG.get('twitter_token'),
    access_token_secret: CONFIG.get('twitter_token_secret')
});

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
            res.json(users);
        });
    } else {
        res.status(400);
        res.end();
    }
});

root.post('/users/following', function (req, res, next) {
    var user = req.body;
    Following.follow(user).then(function (docs) {
        res.status(201);
        res.json(docs);
    });
});

root.delete('/users/following/:id', function (req, res, next) {
    Following.unFollow(req.params.id).then(function (user) {
        if (user) {
            res.status(204);
        } else {
            res.status(404);
        }

        res.end();
    });
});

module.exports = root;

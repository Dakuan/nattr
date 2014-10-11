var express = require('express'),
    twitter = require('twitter'),
    _ = require('underscore'),
    Following = require('../../data/followers-data'),
    CONFIG = require('../../config/config'),
    root = express.Router();

var twit = new twitter({
    consumer_key: CONFIG.get('twitter_consumer_key'),
    consumer_secret: CONFIG.get('twitter_consumer_secret'),
    access_token_key: CONFIG.get('twitter_token'),
    access_token_secret: CONFIG.get('twitter_token_secret')
});

root.get('/users/following', function (req, res, next) {
    Following.findAll().then(function (following) {
        res.json(following);
    });
});

root.get('/users/search', function (req, res, next) {
    var fragment = req.query.name;
    twit.searchUser(fragment, {}, function (users) {
        res.json(users);
    });
});

root.post('/users/following', function (req, res, next) {
    var user = req.body;
    Following.follow(user).then(function (docs) {
        res.json(docs);
    });
});

root.delete('/users/following/:id', function (req, res, next) {
    Following.unFollow(req.params.id).then(function (user) {
        res.json(user);
    });
});

module.exports = root;

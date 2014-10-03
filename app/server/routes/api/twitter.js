var express = require('express'),
    twitter = require('twitter'),
    _ = require('underscore'),
    Following = require('../../data/followers-data'),
    CONFIG = require('../../config/config'),
    root = express.Router();

var amqp = require('amqp');

var connection = amqp.createConnection();

var twit = new twitter({
    consumer_key: CONFIG.get('twitter_consumer_key'),
    consumer_secret: CONFIG.get('twitter_consumer_secret'),
    access_token_key: CONFIG.get('twitter_token'),
    access_token_secret: CONFIG.get('twitter_token_secret')
});

root.get('/user/search', function (req, res, next) {
    var fragment = req.query.name;
    twit.searchUser(fragment, {}, function (users) {
        res.json(users);
    });
});

root.post('/user/follow', function (req, res, next) {
    var user = req.body;
    console.log(Following);
    Following.follow(user, function (docs) {
        res.json(docs);
    });

});

module.exports = root;

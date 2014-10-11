var Twitter = require('node-tweet-stream'),
    _ = require('underscore'),
    CONFIG = require('../config/config'),
    t = new Twitter({
        consumer_key: CONFIG.get('twitter_consumer_key'),
        consumer_secret: CONFIG.get('twitter_consumer_secret'),
        token: CONFIG.get('twitter_token'),
        token_secret: CONFIG.get('twitter_token_secret')
    });

module.exports = function (io, following) {

    function _follow() {
        following.findAll().then(function (users) {
            _.chain(users)
                .pluck('id')
                .each(function (id) {
                    t.follow(id);
                });
        });
    }

    var emit = _.throttle(function (tweet) {
        io.emit('tweet', tweet);
    });

    following.on('change', _follow);

    _follow();
    
    t.on('tweet', function (tweet) {
        if (tweet.retweeted_status) {} else {
            emit(tweet);
        }
    });

    t.on('error', function (err) {
        console.log('Oh no');
    });
};

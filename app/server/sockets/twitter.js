var Twitter = require('node-tweet-stream'),
    _ = require('underscore'),
    CONFIG = require('../config/config'),
    t = new Twitter({
        consumer_key: CONFIG.get('twitter_consumer_key'),
        consumer_secret: CONFIG.get('twitter_consumer_secret'),
        token: CONFIG.get('twitter_token'),
        token_secret: CONFIG.get('twitter_token_secret')
    });

t.track('pizza');
t.follow('8820362');

module.exports = function (io) {
    t.on('tweet', _.throttle(function (tweet) {
        io.emit('tweet', {
            avatar: tweet.user.profile_image_url,
            name: tweet.user.screen_name,
            text: tweet.text
        });
    }, 5000));

    t.on('error', function (err) {
        console.log('Oh no');
    });
}

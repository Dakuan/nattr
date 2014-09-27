var CONFIG = require('../config/config'),
    User = require('../data/user-data'),
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new TwitterStrategy({
            consumerKey: CONFIG.get('twitter_consumer_key'),
            consumerSecret: CONFIG.get('twitter_consumer_secret'),
            callbackURL: 'http://' + CONFIG.get('host') + '/auth/twitter/callback',
            passReqToCallback: true
        },
        function (req, token, tokenSecret, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id
                User.findOne({
                    'twitter.id': profile.id
                }, function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    var twitterData = {
                        id: profile.id,
                        token: token,
                        displayName: profile.displayName,
                        username: profile.username
                    }

                    if (!user) {
                        // doesnt exist so we need a new one
                        user = new User();
                    }
                    user.avatar = profile._json.profile_image_url || 'http://static.tumblr.com/d243ef43eb98da500f17caf27591328f/idtiyzz/BrKmmge1w/tumblr_static_grumpy_cat_.png';
                    user.name = user.name || twitterData.username;
                    user.twitter = twitterData;

                    // save our user to the database
                    user.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, user);
                    });
                });
            });
        }
    ));
}

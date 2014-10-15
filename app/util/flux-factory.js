var Fluxxor = require('fluxxor'),
    UpdateStore = require('../stores/update-store'),
    UsersStore = require('../stores/users-store'),
    UserSessionStore = require('../stores/user-session-store'),
    RouteStore = require('../stores/route-store'),
    TwitterUserSearchStore = require('../stores/twitter-user-search-store'),
    TwitterFollowingStore = require('../stores/twitter-following-store');

module.exports = function (opts) {

    // Fire up flux
    var flux = new Fluxxor.Flux({
        updateStore: new UpdateStore(),
        userSessionStore: new UserSessionStore(opts),
        routeStore: new RouteStore(opts),
        usersStore: new UsersStore(opts),
        twitterUserSearchStore: new TwitterUserSearchStore(),
        twitterFollowingStore: new TwitterFollowingStore(opts),
    }, require('../actions/actions'));

    return flux
};

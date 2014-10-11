var Fluxxor = require('fluxxor'),
    UpdateStore = require('../stores/update-store'),
    UsersStore = require('../stores/users-store'),
    UserSessionStore = require('../stores/user-session-store'),
    RouteStore = require('../stores/route-store'),
    TwitterStore = require('../stores/twitter-store');

module.exports = function (opts) {

    // Fire up flux
    var flux = new Fluxxor.Flux({
        updateStore: new UpdateStore(),
        userSessionStore: new UserSessionStore({
            user: opts.user
        }),
        routeStore: new RouteStore({
            path: opts.path
        }),
        usersStore: new UsersStore({
            users: opts.users
        }),
        twitterStore: new TwitterStore({
            following: opts.following
        })
    }, require('../actions/actions'));

    return flux
};

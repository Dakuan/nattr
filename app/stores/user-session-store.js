var Fluxxor = require('fluxxor'),
    UserSessionStore = Fluxxor.createStore({

        initialize: function (opts) {
            this._user = opts.user;
        },

        getUser: function () {
            return this._user;
        }
    });

module.exports = UserSessionStore;

var Fluxxor = require('fluxxor'),
    UserSessionStore = Fluxxor.createStore({

        initialize: function (user) {
            this._user = user;
        },

        getUser: function () {
            return this._user;
        }
    });

module.exports = UserSessionStore;

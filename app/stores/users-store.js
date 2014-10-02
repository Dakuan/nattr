var Fluxxor = require('fluxxor'),
    UsersActionTypes = require('../constants/users-action-types'),
    UserSessionStore = Fluxxor.createStore({

        initialize: function (opts) {
            this._users = opts.users || [];
            this.bindActions(UsersActionTypes.USER_JOIN, "_onUserJoin");
            this.bindActions(UsersActionTypes.USERS_INIT, "_onUsersInit");
            this.bindActions(UsersActionTypes.USERS_SET, "_onUsersSet");
        },

        getUsers: function () {
        	return this._users;
        },

        _onUsersSet: function(users) {
            this._users = users;
            this.emit('change');
        },

        _onUsersInit: function (users) {
            this._users = this._users.concat(users);
            this.emit('change');
        },

        _onUserJoin: function (user) {
            this._users.push(user);
            this.emit('change', this._users);
        }
    });

module.exports = UserSessionStore;

var Fluxxor = require('fluxxor'),
    UsersActionTypes = require('../constants/users-action-types'),
    _ = require('underscore'),
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

        _onUsersSet: function (users) {
            this._users = users;
            this._sortUsers();
            this.emit('change');
        },

        _onUsersInit: function (users) {
            this._users = this._users.concat(users);
            this._sortUsers();
            this.emit('change');
        },

        _onUserJoin: function (user) {
            this._users.push(user);
            this._sortUsers();
            this.emit('change', this._users);
        },
        _sortUsers: function () {
            this._users = _(this._users).sortBy(function (user) {
                return user.name.toLowerCase();
            });
        }
    });

module.exports = UserSessionStore;

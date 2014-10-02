var UsersActionTypes = require('../constants/users-action-types'),
    socket = require('../client/sockets/update-socket')();
module.exports = {
    addUser: function (user) {
        this.dispatch(UsersActionTypes.USER_JOIN, user);
    },
    addUsers: function (users) {
    	this.dispatch(UsersActionTypes.USERS_INIT, users);
    },
    setUsers: function (users) {
    	this.dispatch(UsersActionTypes.USERS_SET, users);
    }
};

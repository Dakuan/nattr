var _ = require('underscore');

function _finder(idToFind) {
    return function (user) {
        return user._id === idToFind;
    };
}

function Room(io) {
    this._io = io;
    this._connections = {};
    this._users = [];
    this._io.on('connection', this._onConnection.bind(this));
}

Room.prototype.getUsers = function () {
    return this._users;
};

Room.prototype._onConnection = function (socket) {
    this._connections[socket.id] = {
        socket: socket
    };
    socket.emit('users', this.getUsers());
    socket.on('join', this._onJoin(socket.id).bind(this));
    socket.on('chat message', function (msg) {
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', this._onDisconnect(socket).bind(this));
};

Room.prototype._onDisconnect = function (socket) {
    return function () {
        var user = this._connections[socket.id].user;
        this._connections = _(this._connections).omit(socket.id);
        if (user) {
            var connections = _(this._connections).any(function (con) {
                if (con.user) {
                    return con.user._id === user._id;
                }
                return false;
            });
            if (!connections) {
                this._users = _(this._users).reject(_finder(user._id));
                this._io.emit('user left', user, this._users);
            }
        }
    };
};

Room.prototype._haveUser = function (id) {
    return _.find(this._users, _finder(id));
};

Room.prototype._onJoin = function (id) {
    return function (user) {
        this._connections[id].user = user;
        if (!this._haveUser(user._id)) {
            this._users.push(user);
            this._connections[id].socket.broadcast.emit('user joined', user, this._users);
        }
    }
};

module.exports = Room;

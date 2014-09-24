var io = require('socket.io-client');

module.exports = function () {
    if (typeof window !== 'undefined') {
        var socket = io();
        return socket;
    }
    return {
        emit: function () {}
    };
};

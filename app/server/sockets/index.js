module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('connected to socket');
        socket.on('disconnect', function () {});

        socket.on('chat message', function (msg) {
            socket.broadcast.emit('chat message', msg);
        });
    });
}

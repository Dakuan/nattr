var Room = require('./room');

module.exports = function (io) {

    var room = new Room(io);
    // io.on('connection', function (socket) {
    //     console.log('connected to socket');
    //     socket.on('disconnect', function () {});

    //     socket.on('chat message', function (msg) {
    //         socket.broadcast.emit('chat message', msg);
    //     });

    //     socket.on('join', function (user) {
    //     	console.log(user);
    //     });
    // });
}

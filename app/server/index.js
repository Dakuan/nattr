var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    cons = require('consolidate'),
    io = require('socket.io')(http),
    path = require('path');

// Routes
app.use('/', require('./routes/root'));

// Assets
app.use('/public/images', express.static(path.join(__dirname, '../public/images')));
app.use('/public/js', express.static(path.join(__dirname, '../../build/js')));
app.use('/public/css', express.static(path.join(__dirname, '../../build/css')));

// Templating
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Sockets
require('./sockets/index')(io);
require('./sockets/twitter')(io);

// Go!
http.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});

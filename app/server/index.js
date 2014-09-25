var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    cons = require('consolidate'),
    io = require('socket.io')(http),
    CONFIG = require('./config/config'),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    path = require('path');


// Connect to mongodb
var connect = function () {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(CONFIG.get('mongo_url'), options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Session
app.use(session({
    secret: 'rawr',
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    },
    resave: true
}));

// Login
require('./auth')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));

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

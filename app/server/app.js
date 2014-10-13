var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    cons = require('consolidate'),
    io = require('socket.io')(http),
    CONFIG = require('./config/config'),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    following = require('./data/followers-data'),
    MongoStore = require('connect-mongo')(session),
    path = require('path');

// Connect to mongodb
var connect = function () {
    mongoose.connect(CONFIG.get('mongo_url'), {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Session
app.use(session({
    secret: CONFIG.get('session_secret'),
    saveUninitialized: true,
    store: new MongoStore({
        db: mongoose.connection.db,
    }),
    resave: true
}));

// Parse JSON
app.use(bodyParser.json());

// Login
require('./auth/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/app/root'));
app.use('/login', require('./routes/app/login'));
app.use('/admin', require('./routes/app/admin'));
app.use('/auth', require('./routes/app/auth'));
app.use('/api/twitter', require('./routes/api/twitter'));

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
require('./sockets/twitter')(io, following);

module.exports = http;
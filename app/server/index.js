var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    cons = require('consolidate'),
    io = require('socket.io')(http),
    React = require('react'),
    Fluxxor = require('fluxxor'),
    UpdateStore = require('../stores/update-store'),
    componentLoader = require('./util/component-loader'),
    path = require('path');

// Routes
app.get('/', function (req, res) {

    // Fire up flux
    var flux = new Fluxxor.Flux({
        updateStore: new UpdateStore()
    }, require('../actions/actions'));

    var component = componentLoader('app'),
        html = React.renderComponentToString(component({
            flux: flux
        }));

    res.render('index');
});

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

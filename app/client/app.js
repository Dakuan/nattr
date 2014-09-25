/**x
 * @jsx React.DOM
 */

var React = require('react'),    
    app = document.getElementById('app'),
    Fluxxor = require('fluxxor'),
    Cookies = require('cookies-js'),
    UpdateStore = require('../stores/update-store'),
    UserSessionStore = require('../stores/user-session-store'),
    RouteStore = require('../stores/route-store'),
    cookieParser = require('cookie-parser'),
    Nattr = require('../ui/app');

window.React = require('react');

var userString = Cookies.get('user');

var rs = new RouteStore({
    path: document.location.pathname
});

// Fire up flux
var flux = new Fluxxor.Flux({
    updateStore: new UpdateStore(),
    userSessionStore: new UserSessionStore(cookieParser.JSONCookie(userString)),
    routeStore: rs
}, require('../actions/actions'));

// Sockets
var socket = require('./sockets/update-socket')();

socket.on('chat message', flux.actions.addUpdate);
socket.on('tweet', flux.actions.addUpdate);

React.renderComponent(<Nattr flux={flux} /> , app);

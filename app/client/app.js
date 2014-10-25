/**x
 * @jsx React.DOM
 */

var React = require('react'),    
    app = document.getElementById('app'),
    Fluxxor = require('fluxxor'),
    Cookies = require('cookies-js'),
    fluxFactory = require('../util/flux-factory'),
    userCookie = require('../cookies/user-cookie'),
    cookieParser = require('cookie-parser'),
    _ = require('underscore'),
    Nattr = require('../ui/app');

window.React = require('react');

var userString = Cookies.get(userCookie.name),
    user = cookieParser.JSONCookie(userString);

var flux = fluxFactory({
    path: document.location.pathname,
    user: user,
    users: user ? [user] : [],
    following: window._nrBlob.following
});

// Sockets
var socket = require('./sockets/update-socket')();

if(userString) {
    socket.emit('join', user);   
}

socket.on('chat message', flux.actions.addUpdate);
socket.on('tweet', flux.actions.addTweet);
socket.on('user joined', function(user, users) {
    flux.actions.addUserJoinedNotification(user);
    flux.actions.setUsers(users);
});   
socket.on('users', flux.actions.addUsers);
socket.on('user left', function (user, users) {
    flux.actions.setUsers(users);
    flux.actions.addUserLeftNotification(user);
});

React.renderComponent(<Nattr flux={flux} /> , app);

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
    UsersStore = require('../stores/users-store'),
    TwitterStore = require('../stores/twitter-store'),
    cookieParser = require('cookie-parser'),
    _ = require('underscore'),
    Nattr = require('../ui/app');

window.React = require('react');

var userString = Cookies.get('user'),
    user = cookieParser.JSONCookie(userString);

// Fire up flux
var flux = new Fluxxor.Flux({
    updateStore: new UpdateStore(),
    userSessionStore: new UserSessionStore({
        user: user
    }),
    routeStore: new RouteStore({
        path: document.location.pathname
    }),
    usersStore: new UsersStore({
        users: [user]
    }),
    twitterStore: new TwitterStore({
        following: window._nrBlob.following
    })
}, require('../actions/actions'));

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

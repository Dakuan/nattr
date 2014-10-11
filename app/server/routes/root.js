var express = require('express'),
    _ = require('underscore'),
    React = require('react'),
    basicAuth = require('../middleware/basic-auth'),
    Fluxxor = require('fluxxor'),
    Following = require('../data/followers-data'),
    CONFIG = require('../config/config'),
    UpdateStore = require('../../stores/update-store'),
    UsersStore = require('../../stores/users-store'),
    UserSessionStore = require('../../stores/user-session-store'),
    RouteStore = require('../../stores/route-store'),
    TwitterStore = require('../../stores/twitter-store'),
    componentLoader = require('../util/component-loader'),
    component = componentLoader('app'),
    root = express.Router();

root.get('/', function (req, res, next) {

    if (req.user) {

        res.cookie('user', req.user);

        // Fire up flux
        var flux = new Fluxxor.Flux({
            updateStore: new UpdateStore(),
            userSessionStore: new UserSessionStore(req.user),
            routeStore: new RouteStore({
                path: '/'
            }),
            usersStore: new UsersStore(),
            twitterStore: new TwitterStore()
        }, require('../../actions/actions')),

            html = React.renderComponentToString(component({
                flux: flux
            }));
        res.render('index', {
            html: html
        });
    } else {
        res.redirect('/login');
    }
});

root.get('/login', function (req, res, next) {
    // Fire up flux
    var flux = new Fluxxor.Flux({
        updateStore: new UpdateStore(),
        userSessionStore: new UserSessionStore(),
        routeStore: new RouteStore({
            path: '/login'
        }),
        usersStore: new UsersStore(),
        twitterStore: new TwitterStore()
    }, require('../../actions/actions')),
        html = React.renderComponentToString(component({
            flux: flux
        }));
    res.render('index', {
        html: html
    });
});

root.get('/admin', basicAuth, function (req, res, next) {
    Following.findAll().then(function (following) {
        // Fire up flux
        var flux = new Fluxxor.Flux({
            updateStore: new UpdateStore(),
            userSessionStore: new UserSessionStore(),
            routeStore: new RouteStore({
                path: '/admin'
            }),
            usersStore: new UsersStore(),
            twitterStore: new TwitterStore({
                following: following
            })
        }, require('../../actions/actions')),
            html = React.renderComponentToString(component({
                flux: flux
            }));
        res.render('index', {
            html: html,
            blob: JSON.stringify({
                following: following
            })
        });
    }).catch(function (err) {
        throw err;
    });
});

root.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = root;

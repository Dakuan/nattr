var express = require('express'),
    _ = require('underscore'),
    React = require('react'),
    Fluxxor = require('fluxxor'),
    CONFIG = require('../config/config'),
    UpdateStore = require('../../stores/update-store'),
    UserSessionStore = require('../../stores/user-session-store'),
    RouteStore = require('../../stores/route-store'),
    componentLoader = require('../util/component-loader'),
    component = componentLoader('app'),
    root = express.Router();

root.get('/', function (req, res, next) {

    console.log(CONFIG.get('host'));
    if (req.user) {

        res.cookie('user', req.user);

        // Fire up flux
        var flux = new Fluxxor.Flux({
            updateStore: new UpdateStore(),
            userSessionStore: new UserSessionStore(req.user),
            routeStore: new RouteStore({
                path: '/'
            })
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
        })
    }, require('../../actions/actions')),
        html = React.renderComponentToString(component({
            flux: flux
        }));
    res.render('index', {
        html: html
    });
});

root.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = root;

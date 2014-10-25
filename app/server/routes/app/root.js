var express = require('express'),
    _ = require('underscore'),
    React = require('react'),
    fluxFactory = require('../../../util/flux-factory'),
    componentLoader = require('../../util/component-loader'),
    component = componentLoader('app'),
    userCookie = require('../../../cookies/user-cookie'),
    root = express.Router();

root.get('/', function (req, res, next) {

    if (req.user) {

        // set a cookie to store the user
        userCookie.set(res, req.user);
        
        // Fire up flux
        var flux = fluxFactory({
            path: '/',
            user: req.user
        }),
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

module.exports = root;

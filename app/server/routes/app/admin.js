var express = require('express'),
    React = require('react'),
    basicAuth = require('../../middleware/basic-auth'),
    Following = require('../../data/followers-data'),
    fluxFactory = require('../../../util/flux-factory'),
    componentLoader = require('../../util/component-loader'),
    component = componentLoader('app'),
    root = express.Router();

root.use(basicAuth);

root.get('/', function (req, res, next) {
    Following.findAll().then(function (following) {
        // Fire up flux
        var flux = fluxFactory({
            path: '/admin',
            following: following
        }),
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
        next(err);
    });
});


module.exports = root;
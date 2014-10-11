var express = require('express'),
    React = require('react'),
    fluxFactory = require('../../../util/flux-factory'),
    componentLoader = require('../../util/component-loader'),
    component = componentLoader('app'),
    root = express.Router();

root.get('/', function (req, res, next) {
    // Fire up flux
    var flux = fluxFactory({
        path: '/login'
    }),
        html = React.renderComponentToString(component({
            flux: flux
        }));
    res.render('index', {
        html: html
    });
});


module.exports = root;
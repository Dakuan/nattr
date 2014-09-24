var express = require('express'),
    _ = require('underscore'),
    React = require('react'),
    Fluxxor = require('fluxxor'),
    UpdateStore = require('../../stores/update-store'),
    componentLoader = require('../util/component-loader'),
    root = express.Router();

root.get('/', function (req, res, next) {

    // Fire up flux
    var flux = new Fluxxor.Flux({
        updateStore: new UpdateStore()
    }, require('../../actions/actions')),
        component = componentLoader('app'),
        html = React.renderComponentToString(component({
            flux: flux
        }));

    res.render('index', {
        html: html
    });
});

module.exports = root;

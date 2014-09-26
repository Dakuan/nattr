var express = require('express'),
    passport = require('passport'),
    root = express.Router();

root.get('/twitter', passport.authenticate('twitter'));

root.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = root;

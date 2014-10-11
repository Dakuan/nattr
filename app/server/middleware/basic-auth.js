var auth = require('basic-auth'),
    CONFIG = require('../config/config');

module.exports = function (req, res, next) {

    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.status(401);
        return res.send('no');
    };

    var user = auth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name === CONFIG.get('admin_user_name') && user.pass === CONFIG.get('admin_user_password')) {
        return next();
    } else {
        return unauthorized(res);
    };
};

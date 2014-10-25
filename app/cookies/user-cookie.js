var cookieName = 'nattr:user:0',
	_ = require('underscore'),
    whiteList = [
        'avatar',
        'name',
        'id'
    ];

module.exports = {
	name: cookieName,
    set: function (res, user) {
        res.cookie(cookieName, _(user).pick(whiteList));
    }
};

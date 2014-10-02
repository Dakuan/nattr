var actionSources = [
    	require('./update-actions'),
    	require('./users-actions'),
    	require('./route-actions')
	],
    _ = require('underscore');

module.exports = _(actionSources).reduce(function (memo, src) {
    return _.extend(memo, src);
}, {});

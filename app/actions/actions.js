var actionSources = [
    	require('./update-actions')
	],
    _ = require('underscore');

module.exports = _(actionSources).reduce(function (memo, src) {
    return _.extend(memo, src);
}, {});

var _ = require('underscore'),
    Backbone = require('backbone');

Backbone.$ = require('jquery');

// this might get run on the server :(
// if (typeof window !== 'undefined') {
//     Backbone.history.start({
//         pushState: true
//     });
// }

var router = new Backbone.Router();

module.exports = router;
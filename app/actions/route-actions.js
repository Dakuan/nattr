var RouteActionTypes = require('../constants/route-action-types');
module.exports = {
    changeRoute: function (path) {
        this.dispatch(RouteActionTypes.CHANGE_ROUTE, path);
    },
};

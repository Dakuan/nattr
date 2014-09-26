var Fluxxor = require('fluxxor'),
    RouteActionTypes = require('../constants/route-action-types'),
    br = require('../client/router'),
    Router = require('route-recognizer').default,
    RouteStore = Fluxxor.createStore({

        initialize: function (options) {
            this.router = new Router();

            this.router.add([{
                path: "/login",
                handler: "login"
            }]);

            this.router.add([{
                path: '/',
                handler: "root"
            }]);

            this.route = this.router.recognize(options.path || '/login')[0];;

            this.bindActions(RouteActionTypes.CHANGE_ROUTE, "onChangeRoute");
        },

        onChangeRoute: function (path, type) {
            this.route = this.router.recognize(path)[0];
            br.navigate(path);
            this.emit("change");
        },

        getRoute: function () {
            return this.route;
        }
    });

module.exports = RouteStore;

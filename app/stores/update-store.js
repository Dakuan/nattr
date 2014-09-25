var Fluxxor = require('fluxxor'),
    UpdateActionTypes = require('../constants/update-action-types'),
    UpdateStore = Fluxxor.createStore({

        initialize: function () {
            this._updates = [];
            this.bindActions(UpdateActionTypes.ADD_TWEET, "onAddUpdate");
            this.bindActions(UpdateActionTypes.ADD_UPDATE, "onAddUpdate");
            this.bindActions(UpdateActionTypes.CREATE_UPDATE, "onAddUpdate");
        },
        
        onAddUpdate: function (payload, type) {
            this._updates.splice(0, 0, payload);
            this.emit("change");
        },

        getUpdates: function () {
            return this._updates;
        }
    });

module.exports = UpdateStore;

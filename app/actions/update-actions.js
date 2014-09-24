var UpdateActionTypes = require('../constants/update-action-types');
var socket = require('../client/sockets/update-socket')();
module.exports = {
    addUpdate: function (update) {
        this.dispatch(UpdateActionTypes.ADD_UPDATE, update);
    },
    createUpdate: function (text) {

    	// bundle into a payload
    	var payload = {
            name: 'ME!',
            text: text
    	};

    	// sent it do everyone else
        socket.emit('chat message', payload);

        // dispatch for local rendering
        this.dispatch(UpdateActionTypes.CREATE_UPDATE, payload);
    }
};

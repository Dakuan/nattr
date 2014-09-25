var UpdateActionTypes = require('../constants/update-action-types'),
    UpdateTypes = require('../constants/update-types'),
    socket = require('../client/sockets/update-socket')();
module.exports = {
    addUpdate: function (update) {        
        this.dispatch(UpdateActionTypes.ADD_UPDATE, update);
    },
    addTweet: function (tweet) {
        this.dispatch(UpdateActionTypes.ADD_TWEET, {
            updateType: UpdateTypes.TWEET,
            content: tweet
        });
    },
    createUpdate: function (text, user) {
        var update = {
            updateType: UpdateTypes.CHAT_MESSAGE,
            content: {
                user: user,
                text: text
            }
        };

        // sent it do everyone else
        socket.emit('chat message', update);

        update.me = true;

        // dispatch for local rendering
        this.dispatch(UpdateActionTypes.CREATE_UPDATE, update);
    }
};

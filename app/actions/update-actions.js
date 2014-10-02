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
    addUserJoinedNotification: function (user) {
        var update = {
            updateType: UpdateTypes.USER_JOINED,
            content: {
                user: user
            }
        };
        this.dispatch(UpdateActionTypes.CREATE_UPDATE, update);
    },
    addUserLeftNotification: function (user) {
        var update = {
            updateType: UpdateTypes.USER_LEFT,
            content: {
                user: user
            }
        };
        this.dispatch(UpdateActionTypes.CREATE_UPDATE, update);
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

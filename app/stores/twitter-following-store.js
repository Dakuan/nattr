var Fluxxor = require('fluxxor'),
    TwitterActionTypes = require('../constants/twitter-action-types'),
    TwitterFollowingStore = Fluxxor.createStore({
        initialize: function (options) {
            this._following = options.following || [];
            this.bindActions(TwitterActionTypes.UPDATE_FOLLOWING, this._onUpdateFollowing);
        },

        getFollowing: function () {
            return this._following; 
        },

        _onUpdateFollowing: function (following) {
            this._following = following;
            this.emit('change');
        }
    });

module.exports = TwitterFollowingStore;

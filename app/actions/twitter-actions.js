var TwitterActionTypes = require('../constants/twitter-action-types');
var API = require('../client/api/twitter-api');

module.exports = {
    userSearch: function (fragment) {
        var api = API(this.flux);
        this.dispatch(TwitterActionTypes.START_USER_SEARCH, fragment);
        api.searchUser(fragment);
    },
    abortTwitterUserSearch: function () {
        this.dispatch(TwitterActionTypes.RESET_USER_SEARCH);
    },
    updateTwitterUserSearchResults: function (result) {
        this.dispatch(TwitterActionTypes.UPDATE_USER_SEARCH, result);
    },
    followUser: function (user) {
        var api = API(this.flux);
        api.followUser(user);
    },
    syncFollowing: function () {
        var api = API(this.flux);
        api.syncFollowing();
    },
    updateFollowing: function (following) {
        this.dispatch(TwitterActionTypes.UPDATE_FOLLOWING, following);
    },
    unfollowUser: function (id) {
        var api = API(this.flux);
        api.unFollowUser(id)
    },
    resetTwitterUserQuery: function () {
        this.dispatch(TwitterActionTypes.RESET_USER_SEARCH);
    }
};

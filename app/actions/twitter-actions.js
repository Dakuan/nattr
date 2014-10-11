var TwitterActionTypes = require('../constants/twitter-action-types');
module.exports = {
    userSearch: function (fragment) {
        this.dispatch(TwitterActionTypes.SEARCH_USER, fragment);
    },
    followUser: function (user) {
        this.dispatch(TwitterActionTypes.FOLLOW_USER, user);
    },
    unfollowUser: function (id) {
        this.dispatch(TwitterActionTypes.UNFOLLOW_USER, id);
    },
    resetTwitterUserQuery: function () {
        this.dispatch(TwitterActionTypes.RESET_QUERY);
    }
};

var requests = {},
    requestKeys = require('../../constants/twitter-api-requests'),
    baseUrl = '/api/twitter/',
    request = require('superagent');

function abort(key) {
    if (requests[key]) {
        requests[key].abort();
        requests[key] = null;
    }
}

module.exports = function (fluxContext) {
    var Actions = fluxContext.actions;
    return {
        searchUser: function (fragment) {
            abort(requestKeys.SEARCH_USER);
            if (fragment === '') {
                Actions.abortTwitterUserSearch();
            } else {
                var req = request.get(baseUrl + 'users/search?name=' + fragment)
                    .type('json')
                    .end(function (res) {
                        requests[requestKeys.SEARCH_USER] = null;
                        Actions.updateTwitterUserSearchResults({
                            fragment: fragment,
                            users: res.body
                        });
                    });
                requests[requestKeys.SEARCH_USER] = req.xhr;
            }
        },

        followUser: function (user) {
            var req = request.post(baseUrl + 'users/following')
                .type('json')
                .send(user)
                .end(function (res) {
                    Actions.syncFollowing();
                });
        },

        unFollowUser: function (id) {
            var req = request.del(baseUrl + 'users/following/' + id)
                .type('json')
                .end(function (res) {
                    Actions.syncFollowing();
                });
        },

        syncFollowing: function () {
            abort(requestKeys.SYNC_FOLLOWING);
            var req = request.get(baseUrl + 'users/following')
                .type('json')
                .end(function (res) {
                    Actions.updateFollowing(res.body);
                    requests[requestKeys.SYNC_FOLLOWING] = null;
                });
            requests[requestKeys.SYNC_FOLLOWING] = req.xhr;
        }
    };
};

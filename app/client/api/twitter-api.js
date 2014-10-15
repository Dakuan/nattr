var requests = {},
	requestKeys = require('../../constants/twitter-api-requests'),
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
                var req = request.get("/api/twitter/users/search?name=" + fragment)
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
            var req = request.post('/api/twitter/users/following')
                .type('json')
                .send(user)
                .end(function (res) {
                    Actions.syncFollowing();
                });
        },

        unFollowUser: function (id) {
            var req = request.del('/api/twitter/users/following/' + id)
                .type('json')
                .end(function (res) {
                    Actions.syncFollowing();
                });
        },

        syncFollowing: function () {
            var req = request.get('/api/twitter/users/following')
                .type('json')
                .end(function (res) {
                    Actions.updateFollowing(res.body);
                });
        }
    };
};

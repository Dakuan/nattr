var Fluxxor = require('fluxxor'),
    xhr = require('xhr'),
    TwitterActionTypes = require('../constants/twitter-action-types'),
    TwitterStore = Fluxxor.createStore({

        initialize: function (options) {
            this._resetQuery();
            this._following = options.following || [];
            this.bindActions(TwitterActionTypes.SEARCH_USER, '_onUserSearch');
            this.bindActions(TwitterActionTypes.FOLLOW_USER, '_onUserFollow');
            this.bindActions(TwitterActionTypes.UNFOLLOW_USER, '_onUserUnFollow');
            this.bindActions(TwitterActionTypes.RESET_QUERY, '_onResetQuery');
        },

        getFollowing: function () {
            return this._following;
        },

        getQuery: function () {
            return this._query;
        },

        _resetQuery: function () {
            this._query = {
                fragment: '',
                users: []
            };
            this.emit('change');
        },

        _onResetQuery: function () {
            this._resetQuery();
        },

        _onUserUnFollow: function (id) {
            xhr({
                uri: '/api/twitter/users/following/' + id,
                method: 'DELETE'
            }, function () {
                this._syncFollowing();
            }.bind(this));
        },

        _onUserFollow: function (user) {
            xhr({
                uri: '/api/twitter/users/following',
                method: 'POST',
                json: user
            }, function (err, resp) {
                if (err) {

                } else {
                    this._syncFollowing();
                }
            }.bind(this));
        },

        _syncFollowing: function () {
            xhr({
                uri: '/api/twitter/users/following',
                json: true
            }, function (err, resp, following) {
                if (err) {} else {
                    this._following = following;
                    this.emit('change');
                }
            }.bind(this));
        },

        _onUserSearch: function (fragment) {

            if (fragment === '') {
                this._resetQuery();
            } else {
                this._query.fragment = fragment;
                this.emit('change');
                if (this._userSearchXhr) {
                    this._userSearchXhr.abort();
                    this._userSearchXhr = false;
                }
                this._userSearchXhr = xhr({
                    uri: "/api/twitter/users/search?name=" + fragment
                }, function (err, resp, body) {
                    if (body) {
                        var result = JSON.parse(body);
                        this._query = {
                            fragment: fragment,
                            users: result
                        };
                        this._userSearchXhr = false;
                        this.emit('change');
                    }

                }.bind(this));

            }
        }
    });

module.exports = TwitterStore;

var Fluxxor = require('fluxxor'),
    xhr = require('xhr'),
    TwitterActionTypes = require('../constants/twitter-action-types'),
    TwitterStore = Fluxxor.createStore({

        initialize: function () {
            this._resetQuery();
            this.bindActions(TwitterActionTypes.SEARCH_USER, '_onUserSearch');
            this.bindActions(TwitterActionTypes.FOLLOW_USER, '_onUserFollow');
        },

        getQuery: function () {
            return this._query;
        },

        _resetQuery: function () {
            this._query = {
                users: []
            };
            this.emit('change');
        },

        _onUserFollow: function (user) {
            xhr({
                uri: '/api/twitter/user/follow',
                method: 'POST',
                json: user
            }, function () {
                console.log(arguments);
            });
        },

        _onUserSearch: function (fragment) {

            if (fragment === '') {
                this._resetQuery();                
            } else {
                if (this._userSearchXhr) {
                    this._userSearchXhr.abort();
                    this._userSearchXhr = false;
                }
                this._userSearchXhr = xhr({
                    uri: "/api/twitter/user/search?name=" + fragment
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

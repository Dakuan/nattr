var Fluxxor = require('fluxxor'),
    TwitterActionTypes = require('../constants/twitter-action-types'),
    TwitterUserSearchStore = Fluxxor.createStore({
        initialize: function () {
        	this._reset();
            this.bindActions(TwitterActionTypes.START_USER_SEARCH, this._onStart);
            this.bindActions(TwitterActionTypes.UPDATE_USER_SEARCH, this._onUpdate);
            this.bindActions(TwitterActionTypes.RESET_USER_SEARCH, this._onReset);
        },
        getQuery: function () {
            return {
                loading: this._loading,
                fragment: this._fragment,
                users: this._users || []
            }
        },
        _reset: function () {
            this._users = [];
            this._loading = false;
            this._fragment = '';
        },
        _onReset: function () {
        	this._reset();
        	this.emit('change');
        },
        _onStart: function (fragment) {
            this._fragment = fragment;
            this._loading = true;
            this.emit('change')
        },
        _onUpdate: function (res) {
            this._loading = false;
            this._fragment = res.fragment;
            this._users = res.users;
            this.emit('change');
        }
    });

module.exports = TwitterUserSearchStore;

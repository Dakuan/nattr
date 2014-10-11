var MongoClient = require('mongodb').MongoClient,
    util = require('util'),
    events = require('events'),
    Q = require('q'),
    CONFIG = require('../config/config');

function Following() {}

util.inherits(Following, events.EventEmitter);

Following.prototype.follow = function (user) {
    var self = this,
        deferred = Q.defer();

    MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {

        if (err) {
            deferred.reject(err);
            return;
        }

        var collection = db.collection('following');
        collection.update({
            id: user.id
        }, user, {
            upsert: true
        }, function (err, docs) {
            if (err) {
                deferred.reject(err);
                return;
            }
            self.emit('change');
            deferred.resolve(docs);
            db.close();
        });
    });

    return deferred.promise;
};

Following.prototype.unFollow = function (id) {
    var self = this,
        deferred = Q.defer();

    MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
        var collection = db.collection('following');
        collection.remove({
            id_str: id
        }, {
            remove: true
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(user);
        });
    });

    return deferred.promise;
};

Following.prototype.findAll = function (done) {
    var deferred = Q.defer();
    MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
        if (err) {
            deferred.reject(err);
            return;
        }

        var collection = db.collection('following');

        collection.find().toArray(function (err, data) {
            if (err) {
                deferred.reject(err);
                return;
            }

            deferred.resolve(data);
        });
    });

    return deferred.promise;
};

module.exports = new Following();

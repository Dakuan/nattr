var MongoClient = require('mongodb').MongoClient,
    util = require('util'),
    events = require('events'),
    CONFIG = require('../config/config');

function Following() {}

util.inherits(Following, events.EventEmitter);

Following.prototype.follow = function (user, done) {
    var self = this;
    MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
        if (err) throw err;
        var collection = db.collection('following');
        collection.update({
            id: user.id
        }, user, {
            upsert: true
        }, function (err, docs) {
            if (err) throw err;
            self.emit('change');
            done(docs);
        });
    });
};

Following.prototype.findAll = function (done) {
    MongoClient.connect(CONFIG.get('mongo_url'), function (err, db) {
        var collection = db.collection('following');
        collection.find().toArray(function (err, data) {
        	done(data);
        });
    });
};

module.exports = new Following();

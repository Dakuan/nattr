var mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
    	name: String,
        avatar: String,
        local: {
            email: String,
            password: String,
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        twitter: {
            id: String,
            token: String,
            displayName: String,
            username: String
        },
        google: {
            id: String,
            token: String,
            email: String,
            name: String
        }
    });

module.exports = mongoose.model('User', userSchema);
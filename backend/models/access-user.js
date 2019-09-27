const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);

let AccessUser = mongoose.model('AccessUser', UserSchema);
module.exports = AccessUser;
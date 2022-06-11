const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    uname: String,
    email: String,
    password: String,
    verified:Boolean
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
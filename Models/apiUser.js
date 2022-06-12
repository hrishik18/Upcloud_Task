const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apiUserSchema = new Schema({
    username: String,
    age: Number,
    email: String,
    regisnum: Number,
    mstatus: Boolean
});

const apiUser = mongoose.model('apiUser', apiUserSchema);
module.exports = apiUser;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Teacher = require('../model/teacher');


var conn = require('../config/db');

const StudentSchema = new Schema({
    name: String,
    std: Number,
    division:String,
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    }
});
const Student = conn.student.model('Student', StudentSchema);
module.exports = Student;
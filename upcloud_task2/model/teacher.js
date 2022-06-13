const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('../model/student');


var conn = require('../config/db');

const TeacherSchema = new Schema({
    teachname: String,
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student" 
    }
});
const Teacher = conn.teacher.model('Teacher', TeacherSchema);
module.exports = Teacher;
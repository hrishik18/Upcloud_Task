const mongoose = require('mongoose');

 mongoose.student = mongoose.createConnection('mongodb://127.0.0.1/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

 mongoose.teacher = mongoose.createConnection('mongodb://127.0.0.1/teacher', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
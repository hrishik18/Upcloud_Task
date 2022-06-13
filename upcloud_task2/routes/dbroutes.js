var express = require('express');
var router = express.Router();

const Teacher = require('../model/teacher');
const Student = require('../model/student');


router.get('/', async (req, res) => {
    // Teacher.
    //     find({},' -__v -_id').
    //     populate({ path: 'student', model: Student }).then((data) => {
    //         //res.status(200).json(data);
    //     }).catch((err) => {
    //         res.status(500).json({ message: err.message });
    //     });
    const studata = await Student.find({}, ' -__v -_id');
    const teachdata = await Teacher.find({}, ' -__v -_id');


    console.log("The student names: ")
    for (var x in studata) {
        console.log(studata[x]['name']);
    }

    console.log("\n The Teacher names: ")
    for (var x in teachdata) {
        console.log(teachdata[x]['teachname']);
    }
    res.status(200).json({ studata, teachdata });

});

router.post('/', (req, res) => {
    const { name, std, division, teachname } = req.body;
    console.log(req.body);

    if (name != null && std != null && division != null) {
        const datas = new Student({
            name,
            std,
            division
        });
        datas.save().then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });
    }
    if (teachname != null) {
        const datat = new Teacher({
            teachname
        });
        datat.save().then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });
    }
});

module.exports = router;

// {
//     "name": "chomu",
//         "std": 9,
//             "division": "C",
//                 "teachname": "Geetha"
// }


// var studata_new = JSON.stringify(studata);
// //studata_new = "'" + studata + "'";
// var studata_new2 = JSON.parse(studata_new);

// var sanitized = '[' + studata_new.replace(/}{/g, '},{') + ']';
// var rows = JSON.parse(sanitized);
// console.log(rows);
// rows.forEach(row => console.log(JSON.stringify(row.data)));
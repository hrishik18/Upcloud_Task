var express = require('express');
const apiUser = require('../Models/apiUser');
var router = express.Router();


router.get('/', (req, res) => {
  apiUser.find({}, 'username age -_id').select({
    "username": 1,
    "age": 1,
    "email": 1,
  }).then((data) => {
    console.log(data);
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  })

});
router.post('/', (req, res) => {
  const { username, age, email, regisnum, mstatus } = req.body;
  const apipost = new apiUser({
    username, age, email, regisnum, mstatus
  });

  apipost.save().then((result) => {
    res.status(201).json(result);
  }).
    catch((err) => {
      res.status(400).json({ message: err.message });
    })
});

router.patch('/:id', (req, res) => {
  // const { username, age, email, regisnum, mstatus } = req.body;
  // const apipost = new apiUser({
  //   username, age, email, regisnum, mstatus
  // });
  apiUser.findByIdAndUpdate(req.params.id, req.body).then(() => {
    apiUser.save().then((result) => { 
      res.status(201).json(result);
    });
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });

});


router.delete('/:id', (req, res) => {
  const { username, age, email, regisnum, mstatus } = req.body;
  apiUser.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ message: "User deleted" });
  }).catch((err) => {
    res.status(404).json({ message: err.message });
  });
});


module.exports = router;




// {
//   "username": "hrishik123",
//     "age": 19,
//       "email": "hrishiksancheti@gmail.com",
//         "regisnum": 728,
//           "mstatus": false
// }
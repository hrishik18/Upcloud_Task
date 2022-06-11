var express = require('express');
var router = express.Router();


router.get('/', (req,res)=> {
    res.render('register');
});
router.post('/', (req, res) => {
  //extract from req.body
});
module.exports = router;
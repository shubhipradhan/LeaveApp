var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/authenticate-controller', function(req, res, next) {
    // res.render('index', {
    //     title: 'Techferry | About'
    // });
    // console.log('res', res);
    res.send('hello')
});

module.exports = router;
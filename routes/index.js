var express = require('express');
var router = express.Router();
var app = express();


var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Techferry'
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Techferry | Login'
    });
});

router.get('/logout', function(req, res, next) {
    res.render('index', {
        title: 'Techferry'
    });
});

router.get('/about', function(req, res, next) {
    res.render('index', {
        title: 'Techferry | About'
    });
});

router.get('/contact', function(req, res, next) {
    res.render('index', {
        title: 'Techferry | Contact'
    });
});

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

module.exports = router;
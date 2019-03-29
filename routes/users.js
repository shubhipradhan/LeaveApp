var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/add', function(req, res, next) {
    res.render('users/add-user', {
        title: 'Techferry | Add User'
    });

});

router.post('/addUserSubmit', function(req, res, next) {
    addPlayer();
});

router.get('/edit/:id', function(req, res, next) {
    res.render('users/add-user', {
        title: 'Techferry | Add User'
    });
});
module.exports = router;



function addPlayer(req, res) {

    console.log('res req', req, res);
    let message = '';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    let username = req.body.username;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = username + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Username already exists';
            res.render('add-player.ejs', {
                message,
                title: "Welcome to Socka | Add a new player"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player"
                });
            }
        }
    });
}
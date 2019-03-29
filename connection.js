const mysql = require('mysql');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shubhi',
    database: 'world'
});

db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
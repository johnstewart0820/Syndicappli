var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : '360platform'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
'user strict';
var sql = require('../../config/db');

//Task object constructor
var Auth = function(auth){
    this.email = auth.email;
    this.password = auth.password;
};
Auth.login = function (result) {
    sql.query("select * from user where email = ? and password = ?", this.email, this.password, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

module.exports = Auth;
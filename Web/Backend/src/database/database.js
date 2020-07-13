/**
 * Database connect file
 *
 * @package   backend/src/database
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var mysql = require('mysql')
const databaseConfig = require('../config/database-config')

/**
 * Function that create pool to connect mysql db fastly
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object databaseConfig
 * @return  object connection
 */
var connection = mysql.createConnection(databaseConfig)
connection.connect(function (err){
    if(err){
        console.log('Can\'t connect to the DB: ', err)
    }else{
        console.log('Connected!')
    }
})

module.exports = connection

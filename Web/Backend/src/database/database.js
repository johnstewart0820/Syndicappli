/**
 * Database connect file
 *
 * @package   backend/src/database
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var mysql = require('mysql')
const databaseConfig = require('../config/database-config')

/**
 * Function that create pool to connect mysql db fastly
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object databaseConfig
 * @return  object connection
 */
var connection = mysql.createPool(databaseConfig)

module.exports = connection

/**
 * Auth model file
 *
 * @package   backend/src/models
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var db = require('../database/database')
var message  = require('../constants/message')
var bcrypt = require('bcrypt-nodejs')
var table  = require('../constants/table')

var authModel = {
    login: login,
    logout: logout,
}


/**
 * Check user login status with email and password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function login(authData) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.USERS + ' WHERE email = ?'

        db.query(query, [ authData.email ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0) {
                    bcrypt.compare(authData.password, rows[0].password, function (error, result) {
                        if (error) {
                            reject({ message: message.INVALID_PASSWORD })
                        } else {
                            if (result) {
                                resolve(rows[0])
                            } else {
                                reject({ message: message.INVALID_PASSWORD })
                            }
                        }
                    })
                } else {
                    reject({ message: message.ACCOUNT_NOT_EXIST })
                }
            }
        })
    })
}

function logout() {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

module.exports = authModel

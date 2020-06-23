/**
 * Auth model file
 *
 * @package   backend/src/models
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
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
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function login(authData) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM ' + table.USER + ' WHERE email = ? and is_active = 1'

    db.query(query, [ authData.email ], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        if (rows.length > 0) {
          bcrypt.compare(authData.password, rows[0].userpasswd, function(error, result) {
            if (error) {
              reject({ message: message.INVALID_PASSWORD })
            } else {
              if (result) {
                resolve(rows[0].userID)  
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

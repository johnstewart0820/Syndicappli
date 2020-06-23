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

var webModel = {
  getProfile: getProfile
}

/**
 * get profile data for user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getProfile(uid) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM ' + table.USER + ' WHERE userID = ?'

    db.query(query, [ uid ], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        resolve(rows[0])  
      }
    })
  })
}

module.exports = webModel

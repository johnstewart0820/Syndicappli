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
  getProfile: getProfile,
  updateProfile: updateProfile
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

/**
 * update profile data for user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProfile(uid, data) {
  return new Promise((resolve, reject) => {
    if (data.new_password === "" || data.new_password === undefined) {
      let query = 'UPDATE ' + table.USER + ' SET lastname = ?, firstname = ?, email = ?, phone = ? WHERE userID = ?'
      db.query(query, [ data.lastname, data.firstname, data.email, data.phone, uid], (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
          resolve(uid)  
        }
      })
    } else {
      getProfile(uid).then((profile) => {
        if (profile) {
          let hash_database_old_password = profile.userpasswd
          let hash_new_password = bcrypt.hashSync(data.new_password)
          bcrypt.compare(data.old_password, hash_database_old_password, function(error, result) {
            if (error) {
              reject({ message: message.INVALID_PASSWORD })
            } else {
              if (result) {
                let query = 'UPDATE ' + table.USER + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, userpasswd = ? WHERE userID = ?'
                db.query(query, [ data.lastname, data.firstname, data.email, data.phone, hash_new_password, uid ], (error, rows, fields) => {
                  if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                  } else {
                    resolve(profile.userID)  
                  }
                })          
              } else {
                reject({ message: message.INVALID_PASSWORD })
              }
            }                
          })
        } else {
          reject({ message: message.INTERNAL_SERVER_ERROR})
        }
      })
    }
  })
}

module.exports = webModel

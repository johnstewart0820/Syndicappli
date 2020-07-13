/**
 * Auth service file
 * 
 * @package   backend/src/services
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth/
 */

var authModel = require('../models/auth-model')
var jwt = require('jsonwebtoken')
var message = require('../constants/message')
var code = require('../constants/code')
var key = require('../config/key-config')
var timer  = require('../constants/timer')
const adminModel = require('../models/web/admin-model')

var authService = {
  login: login,
  logout: logout
}

/**
 * Function that check user login status with email and password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json 
 */
function login(authData) {
  return new Promise((resolve, reject) => {
    authModel.login(authData).then((data) => {
      if (data) {
        let userdata = data
        let token = jwt.sign({ uid: userdata.userID, userdata: userdata }, key.JWT_SECRET_KEY, {
          expiresIn: timer.TOKEN_EXPIRATION
        })

        adminModel.getProfile(userdata.userID).then((result) => {
          resolve({ code: code.OK, message: '', data: { 'token': token, 'profile': result} })
        }).catch((err) => {
          reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
        })
      }
    }).catch((err) => {
      if (err.message === message.INTERNAL_SERVER_ERROR)
        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
      else
        reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
    })
  })
}

/**
 * Function to logout
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string 
 */
function logout() {
  return new Promise((resolve, reject) => {
    authModel.logout().then((result) => {
      resolve({ code: code.OK, message: '', data: {} })
    }).catch((err) => {
      if (err.message === message.INTERNAL_SERVER_ERROR)
        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
      else
        reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
    })
  })
}

module.exports = authService

/**
 * Auth router file
 * 
 * @package   backend/src/routes
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth
 */

var express = require('express')
var router = express.Router()
var authService = require('../services/auth-service')
var authMiddleware = require('../middleware/auth-middleware')

/** 
 * Login api
 */
router.post('/login', login)

/** 
 * logout
 */
router.post('/logout', authMiddleware.checkToken, logout)

/**
 * Function that check user login status with email and password
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function login(req, res) {
  let email = req.body.email
  let password = req.body.password
  
  var authData = {
    email: email,
    password: password,
  }

  authService.login(authData).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

/**
 * Function to logout
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function logout(req, res) {
  // let userId = req.decoded.uid
  authService.logout().then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

module.exports = router

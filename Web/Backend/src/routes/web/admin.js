/**
 * Index router file
 *
 * @package   backend/src/routes
 * @author    DongTuring <dong@turing.com>
 * @author    WangTuring <wangwang@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */

const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth-middleware')
const webService = require('../../services/web/admin-service')


/** 
 * profile api
 */
router.get('/profile', authMiddleware.checkToken, getProfile)
router.post('/profile', authMiddleware.checkToken, updateProfile)

/**
 * user api
 */
router.post('/userList', authMiddleware.checkToken, getUserList)
router.get('/user/:id', authMiddleware.checkToken, getUser)

/**
 * Function that get profile data
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getProfile(req, res) {
    let userId = req.decoded.uid
  
    webService.getProfile(userId).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that update profile data
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function updateProfile(req, res) {
  let userId = req.decoded.uid
  let data = req.body;
  webService.updateProfile(userId, data).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

/**
 * Function that get user list
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getUserList(req, res) {
    let userId = req.decoded.uid
    let data = req.body
    webService.getUserList(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that get user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getUser(req, res) {
    
    let userId = req.decoded.uid
    let data = req.params.id
    webService.getUser(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

module.exports = router

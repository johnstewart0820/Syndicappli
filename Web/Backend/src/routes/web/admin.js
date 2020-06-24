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
const adminService = require('../../services/web/admin-service')


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
router.put('/user/:id', authMiddleware.checkToken, updateUser)

/**
 * company api
 */
router.post('/companyList', authMiddleware.checkToken, getCompanyList)

/**
 * building api
 */
router.post('/buildingList', authMiddleware.checkToken, getBuildingList)
router.post('/buildingListByCompany', authMiddleware.checkToken, getBuildingListByCompany)



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
  
    adminService.getProfile(userId).then((result) => {
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
  adminService.updateProfile(userId, data).then((result) => {
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
    adminService.getUserList(userId, data).then((result) => {
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
    adminService.getUser(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that update user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function updateUser(req, res) {
    
    let userId = req.decoded.uid
    let id = req.params.id
    let data = req.body
    adminService.updateUser(userId, id, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that get company list
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getCompanyList(req, res) {
    
    let userId = req.decoded.uid
    let data = req.body
    adminService.getCompanyList(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that get building list
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getBuildingList(req, res) {
    
    let userId = req.decoded.uid
    let data = req.body
    adminService.getBuildingList(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

/**
 * Function that get building list by company
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getBuildingListByCompany(req, res) {
    let userId = req.decoded.uid
    let data = req.body
    adminService.getBuildingListByCompany(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}

module.exports = router

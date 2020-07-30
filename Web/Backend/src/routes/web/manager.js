/**
 * Auth router file
 *
 * @package   backend/src/routes
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth
 */

const dotenv = require('dotenv')
dotenv.config()

var express = require('express')
var router = express.Router()

const authMiddleware = require('../../middleware/auth-middleware')
const adminService = require('../../services/web/manager/admin-service')
const buildingService = require('../../services/web/manager/building-service')
const managerService = require('../../services/web/manager/manager-service')
const ownerService = require('../../services/web/manager/owner-service')

var multer  = require('multer')
var upload = multer({ dest: process.env.UPLOAD_ORIGIN || '/tmp/', limits: {fileSize: parseInt(process.env.UPLOAD_MAX_FILE_SIZE)} })

/**
 * profile api
 */
router.get('/profile', authMiddleware.checkToken, getProfile)
router.post('/profile', authMiddleware.checkToken, upload.single('avatar'), updateProfile)

/**
 * my company api
 */
router.get('/mycompany', authMiddleware.checkToken, getCompany)
router.post('/mycompany', authMiddleware.checkToken, upload.single('logo'), updateCompany)

/**
 * building api
 */
router.post('/buildingList', authMiddleware.checkToken, getBuildingList)
router.get('/companyListByUser', authMiddleware.checkToken, getCompanyListByUser)
router.post('/building', authMiddleware.checkToken, createBuilding)
router.get('/building/:id', authMiddleware.checkToken, getBuilding)
router.put('/building/:id', authMiddleware.checkToken, updateBuilding)
router.post('/building/:id/delete', authMiddleware.checkToken, deleteBuilding)
router.post('/building/deleteAll', authMiddleware.checkToken, deleteAllBuilding)

/**
 * team api
 */
router.post('/teamList', authMiddleware.checkToken, getManagerList)
router.post('/team', authMiddleware.checkToken, upload.single('logo'), createManager)
router.get('/team/:id', authMiddleware.checkToken, getManager)
router.put('/team/:id', authMiddleware.checkToken, upload.single('logo'), updateManager)
router.post('/team/:id/delete', authMiddleware.checkToken, deleteManager)
router.put('/team/:id/status', authMiddleware.checkToken, updateManagerStatus)
router.post('/team/deleteAll', authMiddleware.checkToken, deleteAllManager)

/**
 * owner api
 */
router.post('/ownerList', authMiddleware.checkToken, getOwnerList)
router.post('/owner', authMiddleware.checkToken,  upload.fields([{name: 'photo_url', maxCount: 1}, {name: 'id_card_front', maxCount: 1},{name: 'id_card_back', maxCount: 1}]), createOwner)
router.post('/owner/:id', authMiddleware.checkToken, getOwner)
router.put('/owner/:id', authMiddleware.checkToken, upload.fields([{name: 'photo_url', maxCount: 1}, {name: 'id_card_front', maxCount: 1},{name: 'id_card_back', maxCount: 1}]), updateOwner)
router.post('/owner/:id/delete', authMiddleware.checkToken, deleteOwner)
router.put('/owner/:id/status', authMiddleware.checkToken, updateOwnerStatus)
router.post('/owner/deleteAll', authMiddleware.checkToken, deleteAllOwner)

/**
 * Function that get profile data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */


function updateProfile(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let file = req.file
    let data = req.body
    adminService.updateProfile(userId, data, file, userdata).then((result)=>{
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
}

/**
 * Function that get profile data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getCompany(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    console.log('userdata:', userdata)
    console.log('uid:', userId)

    adminService.getCompany(userId, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update profile data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */


function updateCompany(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let file = req.file
    let data = req.body
    adminService.updateCompany(userId, data, file, userdata).then((result)=>{
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
}


/////////////////////////////////////////////////Building///////////////////////////////////////

/**
 * Function that get building list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getBuildingList(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body

    buildingService.getBuildingList(userId, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that get company list by user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getCompanyListByUser(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    buildingService.getCompanyListByUser(userId, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that create building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createBuilding(req, res) {

    let userId = req.decoded.uid
    let data = req.body
    let userdata = req.decoded.userdata
    buildingService.createBuilding(userId, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that get building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getBuilding(req, res) {

    let userId = req.decoded.uid
    let data = req.params.id
    let userdata = req.decoded.userdata
    buildingService.getBuilding(userId, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateBuilding(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id;
    let data = req.body
    buildingService.updateBuilding(userId, id, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that deletes building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteBuilding(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id
    let data = req.body
    buildingService.deleteBuilding(userId, id, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that delete all trashed building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteAllBuilding(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    buildingService.deleteAllBuilding(userId, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

///////////////////////////////////Manager///////////////////////////

/**
 * Function that get manager list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getManagerList(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    managerService.getManagerList(userId, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that create user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createManager(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let file = req.file
    managerService.createManager(userId, userdata, req.body, file).then((result)=>{
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
}

/**
 * Function that get manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getManager(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.params.id
    managerService.getManager(userId, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateManager(req, res) {

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id;
    let data = req.body
    let file = req.file
    managerService.updateManager(userId, id, data, userdata, file).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that delete manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteManager(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id
    let data = req.body
    managerService.deleteManager(userId, id, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update manager status
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateManagerStatus(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id;
    let data = req.body
    managerService.updateManagerStatus(userId, id, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that delete all trashed manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteAllManager(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    managerService.deleteAllManager(userId, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

///////////////////////////////////Owner/////////////////////////////

/**
 * Function that get the owner list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getOwnerList(req, res){

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    ownerService.getOwnerList(userId, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}


/**
 * Function that create owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createOwner(req, res){

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    let files = req.files
    ownerService.createOwner(userId, userdata, data, files).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that get owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getOwner(req, res){

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id
    let data = req.body
    ownerService.getOwner(userId, userdata, data, id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateOwner(req, res){

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    let id = req.params.id;
    let files = req.files
    ownerService.updateOwner(userId, userdata, data, files, id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that delete owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteOwner(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let id = req.params.id
    let data = req.body
    ownerService.deleteOwner(userId, id, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update owner status
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateOwnerStatus(req, res){

    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.body
    let id = req.params.id;
    ownerService.updateOwnerStatus(userId, userdata, data, id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that delete all trashed owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteAllOwner(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    ownerService.deleteAllOwner(userId, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

module.exports = router

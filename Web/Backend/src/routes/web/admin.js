/**
 * Index router file
 *
 * @package   backend/src/routes
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @author    WangTuring <wangwang@turing.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const formidable = require('formidable');

const router = express.Router()
const authMiddleware = require('../../middleware/auth-middleware')
const adminService = require('../../services/web/admin/admin-service')
const buildingService = require('../../services/web/admin/building-service')
const companyService = require('../../services/web/admin/company-service')
const managerService = require('../../services/web/admin/manager-service')
const ownerService = require('../../services/web/admin/owner-service')
const {validate} = require('express-validation')
var adminValidation = require('../../validator/admin-validation')
var multer  = require('multer')
var upload = multer({ dest: process.env.UPLOAD_ORIGIN || '/tmp/' })

/**
 * profile api
 */
router.get('/profile', authMiddleware.checkToken, getProfile)
router.post('/profile', authMiddleware.checkToken, updateProfile)

/**
 * user api
 */
router.post('/userList', authMiddleware.checkToken, getUserList)
router.post('/user', authMiddleware.checkToken, createUser)
router.get('/user/:id', authMiddleware.checkToken, getUser)
router.put('/user/:id', authMiddleware.checkToken, updateUser)
router.delete('/user/:id', authMiddleware.checkToken, deleteUser)

router.get('/company_building', authMiddleware.checkToken, getCompanyBuildingListByUser)

/**
 * company api
 */
router.post('/companyList', authMiddleware.checkToken, getCompanyList)
router.post('/company', authMiddleware.checkToken, validate(adminValidation.company), upload.single('logo'), createCompany)
// router.post('/company', authMiddleware.checkToken, upload.single('logo'), createCompany)
router.post('/allCompanyList', authMiddleware.checkToken, getAllCompanyList)
router.get('/company/:id', authMiddleware.checkToken, getCompany)


/**
 * building api
 */
router.post('/buildingList', authMiddleware.checkToken, getBuildingList)
router.get('/companyListByUser', authMiddleware.checkToken, getCompanyListByUser)
router.post('/building', authMiddleware.checkToken, createBuilding)
router.get('/building/:id', authMiddleware.checkToken, getBuilding)
router.put('/building/:id', authMiddleware.checkToken, updateBuilding)

/**
 * manager api
 */
router.get('/building_company', authMiddleware.checkToken, getBuildingCompanyByUser)
router.post('/managerList', authMiddleware.checkToken, getManagerList)
router.post('/manager', authMiddleware.checkToken, createManager)
router.get('/manager/:id', authMiddleware.checkToken, getManager)
router.post('/managerListByCompanyID/:id', authMiddleware.checkToken, getManagerListByCompanyID)
router.put('/manager/:id', authMiddleware.checkToken, updateManager)


/**
 * owner api
 */
router.post('/ownerList', authMiddleware.checkToken, getOwnerList)
router.post('/owner', authMiddleware.checkToken, upload.array('photo', 3), createOwner)
router.post('/owner/edit', authMiddleware.checkToken, getOwner)
router.put('/owner/:id', authMiddleware.checkToken, updateOwner)


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
    var form = new formidable.IncomingForm();
    let file_name = "";
    let userId = req.decoded.uid
    form.on('fileBegin', function (name, file){
        file_name = Date.now() + '.jpg';
        file.path = '/tmp/' + file_name;
    });

    form.parse(req, function (err, fields, files) {
        adminService.updateProfile(userId, fields, files).then((result)=>{
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    });
}

/**
 * Function that get user list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createUser(req, res) {
    var form = new formidable.IncomingForm();
    let file_name = "";
    let userId = req.decoded.uid
    form.parse(req, function (err, fields, files) {
        adminService.createUser(userId, fields, file_name).then((result)=>{
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    });

    form.on('fileBegin', function (name, file){
        file_name = Date.now() + '.jpg';
        file.path = __dirname + '/../../../public/upload/avatar/' + file_name;
    });

    form.on('file', function (name, file){
    });
}

/**
 * Function that get user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * Function that get user list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteUser(req, res) {
    let userId = req.decoded.uid
    let id = req.params.id
    adminService.deleteUser(userId, id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that get company and building list by user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getCompanyBuildingListByUser(req, res) {
    let userId = req.decoded.uid
    adminService.getCompanyBuildingListByUser(userId).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

////////////////////////////////////Company///////////////////////////////////////

/**
 * Function that get company list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getCompanyList(req, res) {

    let userId = req.decoded.uid
    let data = req.body
    companyService.getCompanyList(userId, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that create company
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createCompany(req, res) {
    let userId = req.decoded.uid
    let userdata = req.decoded.userdata
    let file = req.file
    companyService.createCompany(userId, userdata, req.body, file).then((result)=>{
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
}

/**
 * Function that gets company
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getCompany(req, res) {
    let uid = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.params.id
    companyService.getCompany(uid, userdata, data).then((result)=>{
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
}

/**
 * Function that get all company list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getAllCompanyList(req, res) {

    let userId = req.decoded.uid
    let data = req.body
    adminService.getAllCompanyList(userId, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}


/////////////////////////////////////////////////Building///////////////////////////////////////
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


//////////////////////////////////////////Manager//////////////////////////////////
/**
 * Function that get building and company by user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getBuildingCompanyByUser(req, res) {

    let userId = req.decoded.uid
    managerService.getCompanyBuilding(userId).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}


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
    let data = req.body
    managerService.getManagerList(userId, data).then((result) => {
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
    var form = new formidable.IncomingForm();
    let file_name = "";
    let userId = req.decoded.uid
    form.parse(req, function (err, fields, files) {
        managerService.createManager(userId, fields, file_name).then((result)=>{
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    });

    form.on('fileBegin', function (name, file){
        file_name = Date.now() + '.jpg';
        file.path = __dirname + '/../../../public/upload/avatar/' + file_name;
    });

    form.on('file', function (name, file){
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
    let data = req.params.id
    managerService.getManager(userId, data).then((result) => {
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
    let id = req.params.id;
    let data = req.body
    managerService.updateManager(userId, id, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that get manager list by company id
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getManagerListByCompanyID(req, res) {

    let uid = req.decoded.uid
    let userdata = req.decoded.userdata
    let data = req.params.id
    managerService.getManagerListByCompanyID(uid, data, userdata).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

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
    let data = req.body
    ownerService.getOwner(userId, userdata, data).then((result) => {
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
    ownerService.updateOwner(userId, userdata, data).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}
module.exports = router
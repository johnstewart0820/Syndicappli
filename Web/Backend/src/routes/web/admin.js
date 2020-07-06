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
const formidable = require('formidable');

const router = express.Router()
const authMiddleware = require('../../middleware/auth-middleware')
const adminService = require('../../services/web/admin/admin-service')
const buildingService = require('../../services/web/admin/building-service')


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

router.post('/company', authMiddleware.checkToken, createCompany)
router.post('/allCompanyList', authMiddleware.checkToken, getAllCompanyList)

/**
 * building api
 */
router.post('/buildingList', authMiddleware.checkToken, getBuildingList)
router.get('/companyListByUser', authMiddleware.checkToken, getCompanyListByUser)
router.post('/building', authMiddleware.checkToken, createBuilding)
router.get('/building/:id', authMiddleware.checkToken, getBuilding)
router.put('/building/:id', authMiddleware.checkToken, updateBuilding)


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
    var form = new formidable.IncomingForm();
    let file_name = "";
    let userId = req.decoded.uid
    form.parse(req, function (err, fields, files) {
        adminService.updateProfile(userId, fields, file_name).then((result)=>{
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
 * Function that get user list
 *
 * @author  DongTuring <dong@turing.com>
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
 * @author  DongTuring <dong@turing.com>
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
 * Function that create company
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function createCompany(req, res) {
  var form = new formidable.IncomingForm();
  let file_name = "";
  let userId = req.decoded.uid
  form.parse(req, function (err, fields, files) {
      adminService.createCompany(userId, fields, file_name).then((result)=>{
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
 * Function that get all company list
 *
 * @author  DongTuring <dong@turing.com>
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
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getCompanyListByUser(req, res) {
    
  let userId = req.decoded.uid
  buildingService.getCompanyListByUser(userId).then((result) => {
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
    buildingService.getBuildingList(userId, data).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
}



/**
 * Function that create building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function createBuilding(req, res) {
    
  let userId = req.decoded.uid
  let data = req.body
  buildingService.createBuilding(userId, data).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

/**
 * Function that get building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function getBuilding(req, res) {
    
  let userId = req.decoded.uid
  let data = req.params.id
  buildingService.getBuilding(userId, data).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

/**
 * Function that update building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object req
 * @param   object res
 * @return  json 
 */
function updateBuilding(req, res) {
    
  let userId = req.decoded.uid
  let id = req.params.id;
  let data = req.body
  buildingService.updateBuilding(userId, id, data).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
}

module.exports = router

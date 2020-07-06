/**
 * Auth service file
 * 
 * @package   backend/src/services
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth/
 */

var buildingModel = require('../../../models/web/building-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')

var buildingService = {
  
  getCompanyListByUser: getCompanyListByUser,
  getBuildingList: getBuildingList,
  createBuilding: createBuilding,
  getBuilding: getBuilding,
  updateBuilding: updateBuilding,
}



/**
 * Function that get company list by user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function getCompanyListByUser(uid) {
  return new Promise((resolve, reject) => {
    buildingModel.getCompanyListByUser(uid).then((result) => {
        if (result) {
          let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
            expiresIn: timer.TOKEN_EXPIRATION
          })
          
          resolve({ code: code.OK, message: '', data: { 'token': token, 'companylist': result } })
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
 * Function that get building list
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function getBuildingList(uid, data) {
    return new Promise((resolve, reject) => {
      buildingModel.getBuildingList(data).then((buildingList) => {
          if (buildingList) {
            buildingModel.getCountBuildingList(data).then((building_count) => {
              buildingModel.getCompanyListByUser(uid).then((companyList) => {
                if (companyList) {
                  let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                  })
                  resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(building_count / Number(data.row_count)), 'buildinglist': buildingList, 'totalcount': building_count, 'companylist': companyList } })
                }
              })
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
 * Function that create building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function createBuilding(uid, data) {
  return new Promise((resolve, reject) => {
    buildingModel.createBuilding(data).then((result) => {
        if (result) {
          let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
            expiresIn: timer.TOKEN_EXPIRATION
          })
          
          resolve({ code: code.OK, message: '', data: { 'token': token } })
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
 * Function that get building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function getBuilding(uid, data) {
  return new Promise((resolve, reject) => {
    buildingModel.getBuilding(data).then((result) => {
        if (result) {
          let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
            expiresIn: timer.TOKEN_EXPIRATION
          })
          
          resolve({ code: code.OK, message: '', data: { 'token': token, 'building': result.building, 'company_list': result.companyList, 'vote_list': result.votelist } })
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
 * Function that update building
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function updateBuilding(uid, id, data) {
  return new Promise((resolve, reject) => {
    buildingModel.updateBuilding(id, data).then((result) => {
        if (result) {
          let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
            expiresIn: timer.TOKEN_EXPIRATION
          })
          
          resolve({ code: code.OK, message: '', data: { 'token': token } })
        }
      }).catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
        else
          reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
      })
  })
}

module.exports = buildingService

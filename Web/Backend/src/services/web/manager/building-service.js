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

var buildingModel = require('../../../models/web/manager/building-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')
var authHelper = require('../../../helper/authHelper')

var buildingService = {
    getCompanyListByUser: getCompanyListByUser,
    getBuildingList: getBuildingList,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
    deleteBuilding: deleteBuilding,
    deleteAllBuilding: deleteAllBuilding
}



/**
 * Function that get company list by user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getCompanyListByUser(uid, userdata) {
    return new Promise((resolve, reject) => {
        buildingModel.getManagerCompanyListByUser(uid).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuildingList(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        authHelper.hasBuildingPermission(userdata, [code.SEE_PERMISSION, code.EDIT_PERMISSION]).then((response) => {
            buildingModel.getManagerBuildingList(uid, data).then((buildingList) => {
                if (buildingList) {
                    buildingModel.getManagerCountBuildingList(uid, data).then((building_count) => {                        
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(building_count / Number(data.row_count)), 'buildinglist': buildingList, 'totalcount': building_count } })
                    })
                }
            }).catch((err) => {
                if (err.message === message.INTERNAL_SERVER_ERROR)
                    reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                else
                    reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
            })
        }).catch((error) => {
            reject({ code: code.BAD_REQUEST, message: error.message, data: {} })
        })
    })
}


/**
 * Function that create building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createBuilding(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        authHelper.hasBuildingPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            buildingModel.managerCreateBuilding(uid, data).then((result) => {
                if (result) {
                    let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
        }).catch((error) => {
            reject({ code: code.BAD_REQUEST, message: error.message, data: {} })
        })
    })
}

/**
 * Function that get building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuilding(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        buildingModel.getManagerBuilding(uid, data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateBuilding(uid, id, data, userdata) {
    return new Promise((resolve, reject) => {
        buildingModel.managerUpdateBuilding(uid, id, data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
 * Function that deletes building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteBuilding(uid, id, userdata, data) {
    return new Promise((resolve, reject) => {
        buildingModel.managerDeleteBuilding(uid, id, data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
 * Function that delete All trashed company data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteAllBuilding(uid, userdata, data) {
    return new Promise((resolve, reject) => {
        authHelper.hasBuildingPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            buildingModel.deleteAllBuilding(data).then((result) => {
                if (result) {
                    let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
        }).catch((error) => {
            reject({ code: code.BAD_REQUEST, message: error.message, data: {} })
        })
    })
}


module.exports = buildingService

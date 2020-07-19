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

var managerModel = require('../../../models/web/manager-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')
var authHelper = require('../../../helper/authHelper')


var managerService = {
    getCompanyBuilding: getCompanyBuilding,
    getManagerList: getManagerList,
    createManager: createManager,
    getManager: getManager,
    updateManager: updateManager,
    getManagerListByCompanyID: getManagerListByCompanyID,
}


/**
 * Function that get company and buildling list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getCompanyBuilding(uid, userdata) {
    return new Promise((resolve, reject) => {
        managerModel.getCompanyListByUser(uid).then((companyList) => {
            if (companyList) {
                managerModel.getBuildingListByUser(uid).then((buildingList) => {
                    let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                        expiresIn: timer.TOKEN_EXPIRATION
                    })
                    resolve({ code: code.OK, message: '', data: { 'token': token, 'companylist': companyList, 'buildinglist': buildingList } })
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
 * Function that get building list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getManagerList(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        managerModel.getManagerList(uid, data).then((managerList) => {
            if (managerList) {
                managerModel.getCountManagerList(uid, data).then((managerCount) => {
                    let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                        expiresIn: timer.TOKEN_EXPIRATION
                    })
                    resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(managerCount / Number(data.row_count)), 'managerlist': managerList, 'totalcount': managerCount} })
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
 * Function that create manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createManager(uid, data, file, userdata) {
    return new Promise((resolve, reject) => {
        authHelper.hasManagerPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            managerModel.checkDuplicateManager(data).then((response) => {
                managerModel.createManager(uid, data, file).then((data) => {
                    if (data) {
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
        
                        resolve({ code: code.OK, message: '', data: { 'token': token} })
                    }
                })
            }).catch((err) => {
                if (err.message === message.INTERNAL_SERVER_ERROR)
                    reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                else if (err.message === message.MANAGER_ALREADY_EXIST)
                    reject({ code: code.ALREADY_EXIST, message: err.message, data: {} })
                else
                    reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
            })
        }).catch((error) => {
            reject({ code: code.BAD_REQUEST, message: error.message, data: {} })
        })
        
    })
}

/**
 * Function that get manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getManager(uid, id, userdata) {
    return new Promise((resolve, reject) => {
        managerModel.getManager(id).then((manager) => {
            let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                expiresIn: timer.TOKEN_EXPIRATION
            })
            resolve({ code: code.OK, message: '', data: { 'token': token, 'manager':  manager.manager, 'buildinglist': manager.buildingList} })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

/**
 * Function that update manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateManager(uid, id, data, userdata) {
    return new Promise((resolve, reject) => {
        managerModel.updateManager(id, data).then((result) => {
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
 * Function that get building list by company id
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getManagerListByCompanyID(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        managerModel.getManagerListByCompanyID(uid, data).then((managerList) => {
            if (managerList) {
                managerModel.getCountManagerListByCompanyID(uid, data).then((managerCount) => {
                    let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                        expiresIn: timer.TOKEN_EXPIRATION
                    })
                    resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(managerCount / Number(data.row_count)), 'managerlist': managerList, 'totalcount': managerCount} })
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

module.exports = managerService

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

var ownerModel = require('../../../models/web/owner-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')
var authHelper = require('../../../helper/authHelper')

var ownerService = {
    getOwnerList: getOwnerList,
    createOwner: createOwner,
    getOwner: getOwner,
    updateOwner: updateOwner,
}

/**
 * Function that get owner list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getOwnerList(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOwnerPermission(userdata, [code.SEE_PERMISSION, code.EDIT_PERMISSION]).then((response) => {
            ownerModel.getOwnerList(uid, data).then((ownerList) => {
                if (ownerList) {
                    console.log('owner list: ', ownerList)
                    ownerModel.getCountOwnerList(uid, data).then((ownerCount) => {
                        console.log('ownerCount: ', ownerCount)
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(ownerCount / Number(data.row_count)), 'ownerlist': ownerList, 'totalcount': ownerCount} })
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
 * Function that create owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createOwner(uid, userdata ,data, files) {
    return new Promise((resolve, reject) => {
        authHelper.hasOwnerPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            ownerModel.createOwner(uid, data, files).then((response) => {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })
                resolve({ code: code.OK, message: '', data: { 'token': token} })
                
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
 * Function that get owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getOwner(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOwnerPermission(userdata, [code.EDIT_PERMISSION, code.SEE_PERMISSION]).then((response) => {
            ownerModel.getOwner(uid, data).then((ownerList) => {
                if (ownerList) {
                    console.log('owner list: ', ownerList)
                    ownerModel.getCountOwnerList(uid, data).then((ownerCount) => {
                        console.log('ownerCount: ', ownerCount)
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(ownerCount / Number(data.row_count)), 'ownerlist': ownerList, 'totalcount': ownerCount} })
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
 * Function that update owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateOwner(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOwnerPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            ownerModel.updateOwner(uid, data).then((ownerList) => {
                if (ownerList) {
                    console.log('owner list: ', ownerList)
                    ownerModel.getCountOwnerList(uid, data).then((ownerCount) => {
                        console.log('ownerCount: ', ownerCount)
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(ownerCount / Number(data.row_count)), 'ownerlist': ownerList, 'totalcount': ownerCount} })
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
module.exports = ownerService

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

var buildingModel = require('../../../models/web/admin/building-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')
var authHelper = require('../../../helper/authHelper')
const { SEE_PERMISSION } = require('../../../constants/code')

var buildingService = {
    getCompanyListByUser: getCompanyListByUser,
    getBuildingListByCompany: getBuildingListByCompany,
    getBuildingList: getBuildingList,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
    deleteBuilding: deleteBuilding,
    deleteAllBuilding: deleteAllBuilding,
    importBuildingCSV: importBuildingCSV,
    exportBuildingCSV: exportBuildingCSV
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
        buildingModel.getCompanyListByUser(uid).then((result) => {
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
 * Function that get company list by user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuildingListByCompany(uid, data, userdata) {
    return new Promise((resolve, reject) => {
        buildingModel.getBuildingListByCompany(uid, data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token, 'buildinglist': result } })
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
            buildingModel.getBuildingList(uid, data).then((buildingList) => {
                if (buildingList) {
                    buildingModel.getCountBuildingList(uid, data).then((building_count) => {
                        buildingModel.getCompanyListByUser(uid).then((companyList) => {
                            if (companyList) {
                                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
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
            buildingModel.createBuilding(uid, data).then((result) => {
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
        authHelper.hasBuildingPermission(userdata, [code.EDIT_PERMISSION, code.SEE_PERMISSION]).then((response) => {
            buildingModel.getBuilding(data).then((result) => {
                if (result) {
                    let token = jwt.sign({ uid: uid, userdata: userdata}, key.JWT_SECRET_KEY, {
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
        buildingModel.updateBuilding(uid, id, data).then((result) => {
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
        buildingModel.deleteBuilding(uid, id, data).then((result) => {
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

/**
 * Function that delete All trashed company data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function importBuildingCSV(uid, userdata, file, data) {
    return new Promise((resolve, reject) => {
        authHelper.hasBuildingPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            buildingModel.importBuildingCSV(uid, file, data).then((result) => {
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
 * Function that delete All trashed company data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function exportBuildingCSV(uid, userdata, data, res) {
    return new Promise((resolve, reject) => {
        authHelper.hasBuildingPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            buildingModel.exportBuildingCSV(data, res).then((result) => {
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

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

var adminWebModel = require('../../../models/web/admin-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')

var webService = {
    getProfile: getProfile,
    updateProfile: updateProfile,
    getUserList: getUserList,
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getCompanyBuildingListByUser: getCompanyBuildingListByUser,
    getCompanyList: getCompanyList,
    getCompanyListByUser: getCompanyListByUser,

    getAllCompanyList: getAllCompanyList,
    getBuildingList: getBuildingList,
    getBuildingListByCompany: getBuildingListByCompany,
    getBuildingListByUserAndCompany: getBuildingListByUserAndCompany,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
}


/**
 * Function that get profile data with uID
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getProfile(uid) {
    return new Promise((resolve, reject) => {
        adminWebModel.getProfile(uid).then((data) => {
            if (data) {
                let userId = data.userID
                let token = jwt.sign({ uid: data.userID, userdata: data }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token,  profile: data} })
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
 * Function that update profile with uID
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateProfile(uid, data, files) {
    return new Promise((resolve, reject) => {
        adminWebModel.updateProfile(uid, data, files).then((data) => {
            if (data) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token} })
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
 * Function that get User List with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getUserList(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getUserList(data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(result.count / (Number(data.row_count) === -1 ? result.count : Number(data.row_count))), 'userlist': result.rows } })
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
 * Function that create User data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createUser(uid, data, file_name) {
    return new Promise((resolve, reject) => {
        adminWebModel.createUser(data, file_name).then((data) => {
            if (data) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token} })
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
 * Function that get User data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getUser(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getUser(data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })
                resolve({ code: code.OK, message: '', data: { 'token': token,  'user': {'profile': result.profile, 'building':  result.buildings} }})
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
 * Function that update User data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateUser(uid, id, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.updateUser(id, data).then((result) => {
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
 * Function that delete User data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteUser(uid, id) {
    return new Promise((resolve, reject) => {
        adminWebModel.deleteUser(id).then((result) => {
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
 * Function that company and building list by user info
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getCompanyBuildingListByUser(uid) {
    return new Promise((resolve, reject) => {
        adminWebModel.getCompanyBuildingListByUser(uid).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token , 'result': result} })
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
 * Function that get company list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getCompanyList(data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(result.count / Number(data.row_count)), 'companylist': result.rows } })
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
function getCompanyListByUser(uid) {
    return new Promise((resolve, reject) => {
        adminWebModel.getCompanyListByUser(uid).then((result) => {
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
 * Function that get company list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getAllCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getAllCompanyList(data).then((result) => {
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuildingList(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getBuildingList(uid, data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(result.count / Number(data.row_count)), 'buildinglist': result.rows, 'totalcount': result.count, 'companylist': result.company_list } })
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
 * Function that get building list by company
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuildingListByCompany(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getBuildingListByCompany(data.companyID).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
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
 * Function that get building list by company and user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuildingListByUserAndCompany(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getBuildingListByUserAndCompany(data).then((result) => {
            if (result) {
                let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
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
 * Function that create building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createBuilding(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.createBuilding(data).then((result) => {
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuilding(uid, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.getBuilding(data).then((result) => {
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateBuilding(uid, id, data) {
    return new Promise((resolve, reject) => {
        adminWebModel.updateBuilding(id, data).then((result) => {
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

module.exports = webService

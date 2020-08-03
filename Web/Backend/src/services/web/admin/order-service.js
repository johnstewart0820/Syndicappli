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

var orderModel = require('../../../models/web/admin/order-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')
var authHelper = require('../../../helper/authHelper')

var orderService = {
    getOrderList: getOrderList,
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    updateOrderStatus: updateOrderStatus,
    deleteOrder: deleteOrder,
    deleteAllOrder: deleteAllOrder,
    getBuyerList: getBuyerList
}

/**
 * Function that get order list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getOrderList(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.SEE_PERMISSION, code.EDIT_PERMISSION]).then((response) => {
            orderModel.getOrderList(uid, data).then((orderList) => {
                if (orderList) {
                    orderModel.getCountOrderList(uid, data).then((orderCount) => {
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(orderCount / Number(data.row_count)), 'orderlist': orderList, 'totalcount': orderCount} })
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
 * Function that get buyer list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getBuyerList(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.SEE_PERMISSION, code.EDIT_PERMISSION]).then((response) => {
            orderModel.getBuyerList(uid, data).then((buyerList) => {
                let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })
                resolve({ code: code.OK, message: '', data: { 'token': token, 'buyerlist': buyerList} })
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
 * Function that create order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function createOrder(uid, userdata ,data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            orderModel.createOrder(uid, data).then((response) => {
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
 * Function that get order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function getOrder(uid, userdata, id) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION, code.SEE_PERMISSION]).then((response) => {
            orderModel.getOrder(uid, id).then((order) => {
                if (order) {
                        let token = jwt.sign({ uid: uid, userdata: userdata }, key.JWT_SECRET_KEY, {
                            expiresIn: timer.TOKEN_EXPIRATION
                        })
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'order': order} })
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
 * Function that update order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateOrder(uid, userdata, data, id) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            orderModel.updateOrder(id, data).then((response) => {
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
 * Function that update Order status
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateOrderStatus(uid, userdata, data, id) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            orderModel.updateOrderStatus(id, data).then((result) => {
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
 * Function that delete Order data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteOrder(uid, id, userdata, data) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            orderModel.deleteOrder(uid, id, data).then((result) => {
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
 * Function that delete All trashed order data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteAllOrder(uid, userdata) {
    return new Promise((resolve, reject) => {
        authHelper.hasOrderPermission(userdata, [code.EDIT_PERMISSION]).then((response) => {
            orderModel.deleteAllOrder().then((result) => {
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

module.exports = orderService

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

var authModel = require('../models/auth-model')
var jwt = require('jsonwebtoken')
var message = require('../constants/message')
var code = require('../constants/code')
var key = require('../config/key-config')
var timer  = require('../constants/timer')
const adminModel = require('../models/web/admin-model')
const {sendSMS} = require('../helper/twilioHelper')
const {sendMail} = require('../helper/mailHelper')
var mail = require('../constants/mail')
var randtoken = require('rand-token');

var authService = {
    login: login,
    firstLogin: firstLogin,
    forgotPassword: forgotPassword,
    verifyToken: verifyToken,
    resetPassword: resetPassword,
    verifySMS:verifySMS,
    logout: logout
}

/**
 * Function that check user login status with email and password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function login(authData) {
    return new Promise((resolve, reject) => {
        authModel.login(authData).then((data) => {
            if (data) {
                let userdata = data
                let token = jwt.sign({ uid: userdata.userID, userdata: userdata }, key.JWT_SECRET_KEY, {
                    expiresIn: timer.TOKEN_EXPIRATION
                })

                adminModel.getProfile(userdata.userID).then((result) => {
                    resolve({ code: code.OK, message: '', data: { 'token': token, 'profile': result} })
                }).catch((err) => {
                    reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
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
 * Function that check user first login status with email and password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  json
 */
function firstLogin(authData) {
    return new Promise((resolve, reject) => {
        authModel.login(authData).then((data) => {
            if (data) {
                var sms_code = Math.floor(100000 + Math.random() * 900000);
                var body = "Verification Code: " + sms_code;
                var to = data.phone;
                console.log("SMS Code: ", sms_code)
                let sms_token = jwt.sign({ smsCode: sms_code}, key.JWT_SECRET_KEY, {
                    expiresIn: timer.SMS_TOKEN_EXPIRATION
                })
                sendSMS(to, body)
                    .then((response) => {
                        authModel.saveSMS(data.email, sms_token).then((result) => {
                            resolve({ code: code.OK, message: message.SMS_CODE_SENT_SUCCESSFULLY, data: {}})
                        }).catch((err) => {
                            reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                        })
                    })
                    .catch((err) => {
                        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
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
 * Function to Forgot Password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string
 */
function forgotPassword(email){
    return new Promise((resolve, reject) => {
        var tmpToken = randtoken.generate(15);
        let reset_token = jwt.sign({ tmpToken: tmpToken}, key.JWT_SECRET_KEY, {
            expiresIn: timer.SMS_TOKEN_EXPIRATION
        })
        console.log("tmp token: ", tmpToken)
        authModel.verifyUser(email).then((data) => {
            sendMail(mail.TITLE_FORGOT_PASSWORD, email, mail.TYPE_FORGOT_PASSWORD, reset_token)
                .then((response) => {
                    authModel.saveToken(email, reset_token).then((result) => {
                        resolve({ code: code.OK, message: message.EMAIL_RESET_LINK_SENT_SUCCESSFULLY, data: {}})
                    }).catch((err) => {
                        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                    })
                })
                .catch((err) => {
                    if(err.message.statusCode == code.BAD_REQUEST){
                        reject({ code: code.INTERNAL_SERVER_ERROR, message: message.EMIL_IS_NOT_EXIST, data: {} })
                    } else {
                        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                    }
                })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

/**
 * Function to Verify the token
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string
 */
function verifyToken(email, token){
    return new Promise((resolve, reject) => {
        authModel.verifyToken(email, token).then((data) => {
            var tmpToken = randtoken.generate(15);
            let refresh_reset_token = jwt.sign({ tmpToken: tmpToken}, key.JWT_SECRET_KEY, {
                expiresIn: timer.SMS_TOKEN_EXPIRATION
            })
            authModel.saveToken(email, refresh_reset_token).then((resp) => {
                resolve({ code: code.OK, message: message.VERIFIED_TOKEN_SUCCESSFULLY, data: {} })
            }).catch((err) => {
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
            })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

/**
 * Function to Reset the password
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string
 */
function resetPassword(email, new_password){
    return new Promise((resolve, reject) => {
        authModel.resetPassword(email, new_password).then((data) => {
            resolve({ code: code.OK, message: message.RESET_PASSWORD_SUCCESSFULLY, data: {} })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

/**
 * Function to Verify the SMS code
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string
 */
function verifySMS(email, code){
    return new Promise((resolve, reject) => {
        authModel.verifySMS(email, code).then((data) => {
            if (data) {
                var sms_code = Math.floor(100000 + Math.random() * 900000);
                let refresh_sms_token = jwt.sign({ smsCode: sms_code}, key.JWT_SECRET_KEY, {
                    expiresIn: timer.SMS_TOKEN_EXPIRATION
                })
                authModel.saveSMS(email, refresh_sms_token).then((resp) => {
                    let userdata = data
                    let token = jwt.sign({ uid: userdata.userID, userdata: userdata }, key.JWT_SECRET_KEY, {
                        expiresIn: timer.TOKEN_EXPIRATION
                    })

                    adminModel.getProfile(userdata.userID).then((result) => {
                        resolve({ code: code.OK, message: '', data: { 'token': token, 'profile': result} })
                    }).catch((err) => {
                        reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                    })
                }).catch((err) => {
                    reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
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
 * Function to logout
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @return  string
 */
function logout() {
    return new Promise((resolve, reject) => {
        authModel.logout().then((result) => {
            resolve({ code: code.OK, message: '', data: {} })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

module.exports = authService

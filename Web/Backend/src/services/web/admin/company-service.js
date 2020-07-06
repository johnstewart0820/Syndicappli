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

var companyModel = require('../../../models/web/company-model')
var jwt = require('jsonwebtoken')
var message = require('../../../constants/message')
var code = require('../../../constants/code')
var key = require('../../../config/key-config')
var timer  = require('../../../constants/timer')

var companyService = {
  getCompanyList: getCompanyList,
}

/**
 * Function that get building list
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  json 
 */
function getCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
      companyModel.getCompanyList(uid, data).then((companyList) => {
          if (companyList) {
            companyModel.getCountCompanyList(uid, data).then((companyCount) => {
              let token = jwt.sign({ uid: uid }, key.JWT_SECRET_KEY, {
                expiresIn: timer.TOKEN_EXPIRATION
              })
              resolve({ code: code.OK, message: '', data: { 'token': token, 'totalpage': Math.ceil(companyCount / Number(data.row_count)), 'companylist': companyList } })
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



module.exports = companyService

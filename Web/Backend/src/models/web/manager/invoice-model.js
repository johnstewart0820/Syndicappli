/**
 * Auth model file
 *
 * @package   backend/src/models
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var db = require('../../../database/database')
var message = require('../../../constants/message')
var bcrypt = require('bcrypt-nodejs')
var table = require('../../../constants/table')
const s3Helper = require('../../../helper/s3helper')
const s3buckets = require('../../../constants/s3buckets')
const timeHelper = require('../../../helper/timeHelper')
const { sendMail } = require('../../../helper/mailHelper')
var mail = require('../../../constants/mail')
var randtoken = require('rand-token');
var code = require('../../../constants/code')

var invoiceModel = {
    getInvoiceAddon: getInvoiceAddon,
    getInvoiceOrder: getInvoiceOrder,
}

/**
 * get order invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getInvoiceOrder(data) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from orders where buyerID = ? and buyer_type = "managers" and permission = "active" and productID not in (select productID from products where name = "Pack de Modules")'

        db.query(query, [data.companyID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}

/**
 * get invoice addonlist by buildingID
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getInvoiceAddon(data) {
    return new Promise((resolve, reject) => {
        let query
        let params = []
        if (data.buildingID == -1) {
            query = 'Select * from orders where companyID = ?  and buyer_type = "managers" and permission = "active" and productID in (select productID from products where name = "Pack de Modules")'
            params = [data.companyID]
        } else {
            query = 'Select * from orders where companyID = ? and buildingID = ? and buyer_type = "managers" and permission = "active" and productID in (select productID from products where name = "Pack de Modules")'
            params = [data.companyID, data.buildingID]
        }

        db.query(query, params, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}

module.exports = invoiceModel

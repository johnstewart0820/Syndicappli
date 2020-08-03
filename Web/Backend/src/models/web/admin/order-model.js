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
var message  = require('../../../constants/message')
var bcrypt = require('bcrypt-nodejs')
var table  = require('../../../constants/table')
const s3Helper = require('../../../helper/s3helper')
const s3buckets = require('../../../constants/s3buckets')
const timeHelper = require('../../../helper/timeHelper')
const {sendMail} = require('../../../helper/mailHelper')
var mail = require('../../../constants/mail')
var randtoken = require('rand-token');
var code = require('../../../constants/code')

var orderModel = {
    getOrderList: getOrderList,
    getCountOrderList: getCountOrderList,
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    deleteAllOrder: deleteAllOrder,
    getBuyerList: getBuyerList,
    getDiscountCodeListByType: getDiscountCodeListByType
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOrderList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT
                    *, orderID ID
                    FROM orders
                    WHERE permission = ? and buyer_type = ? and name like ? `

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        let params = [data.status, data.type, search_key];

        if (sort_column === -1)
            query += ' order by orderID desc';
        else {
            if (sort_column === 0)
                query += ' order by name ';
            else if (sort_column === 1)
                query += ' order by price ';
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, params, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}

/**
 * get buyer list 
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuyerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query
        if (data.buyer_type === "managers")
            query = `SELECT
                    c.companyID buyerID, c.name
                    FROM users u left join user_relationship r on u.userID = r.userID left join companies c on r.relationID = c.companyID
                    WHERE c.permission = "active" and u.userID = ? and r.type="company"`
        else if (data.buyer_type === "buildings")
            query = `Select
                    b.buildingID buyerID, b.name
                    FROM users u left join user_relationship r on u.userID = r.userID left join companies c on r.relationID = c.companyID left join buildings b on c.companyID = b.companyID
                    WHERE c.permission = "active" and b.permission = "active" and u.userID = ? and r.type="company"`
        else if (data.buyer_type === "owners")
            query = `SELECT
                    s.userID buyerID, CONCAT(s.firstname,s.lastname) name
                    FROM
                        users u
                        LEFT JOIN user_relationship r ON u.userID = r.userID
                        LEFT JOIN companies c ON r.relationID = c.companyID
                        LEFT JOIN buildings b ON c.companyID = b.companyID
                        INNER JOIN (
                        SELECT
                            rel.relationID, o.userID, o.firstname, o.lastname
                        FROM
                            users o
                            LEFT JOIN user_relationship rel ON o.userID = rel.userID 
                        WHERE
                            o.permission = "active" 
                            AND o.usertype = "owner" 
                            AND rel.type = "building"
                        ) s ON s.relationID = b.buildingID 
                    WHERE
                        c.permission = "active" 
                        AND b.permission = "active" 
                        AND u.userID = ? group by s.userID and r.type="company"`
        db.query(query, [uid], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}

/**
 * get count for building list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountOrderList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT
                    count(*) count
                    FROM orders
                    WHERE permission = ? and buyer_type = ? and name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [data.status, data.type, search_key];

        db.query(query, params, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}

/**
 * get discount code list by type
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getDiscountCodeListByType(data) {
    return new Promise((resolve, reject) => {
        if (data.user_type === "companies")
            data.user_type = "managers"
        let query = `SELECT
                    discount_codeID, name
                    FROM discount_codes
                    WHERE permission = "active" and user_type = ?`

        db.query(query, [data.user_type], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows)
            }
        })
    })
}

/**
 * create Order only order table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createOrder(uid, data) {
    return new Promise((resolve, reject) => {
        if (data.end_date === undefined || data.end_date === "" || data.end_date === null)
            data.end_date = "9999-12-31"
        let query = `Select * from ` + table.DISCOUNTCODES + ` where discount_codeID = ?`
        db.query(query, [data.discount_codeID], (error, rows, fields)=> {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR})
            } else {
                let discount_codes = rows
                data.discount_type = discount_codes[0].discount_type
                data.discount_amount = discount_codes[0].discount_amount
                let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash")`
                db.query(query, [data.discount_codeID], (error, rows, fields) => {
                    if (error)
                        reject({ message: message.INTERNAL_SERVER_ERROR})
                    else {
                        if (data.discount_codeID > 0 && discount_codes[0].amount_of_use != -1 && rows[0].count + 1 > discount_codes[0].amount_of_use)
                            reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE})
                        else {
                            let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash") and buyerID = ? and buyer_type = ?`
                            db.query(query, [data.discount_codeID, data.buyerID, data.buyer_type], (error, rows, fields) => {
                                if (error)
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                else {
                                    if (data.discount_codeID > 0 && discount_codes[0].amount_of_use_per_user != -1 && rows[0].count + 1 > discount_codes[0].amount_of_use_per_user)
                                        reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE })
                                    else {
                                        let query = `Insert into ` + table.ORDERS + ` (buyer_type, productID, buyerID, billing_cycle, renewal, price_type, price, vat_option, vat_fee, apartment_amount, start_date, end_date, payment_method, discount_codeID, discount_type, discount_amount, status, permission, created_by, created_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                                        db.query(query, [data.buyer_type, data.productID, data.buyerID, data.billing_cycle, data.renewal, data.price_type, data.price, data.vat_option, data.vat_fee, data.apartment_amount, data.start_date, data.end_date, data.payment_method, data.discount_codeID, data.discount_type, data.discount_amount, data.status, "active", uid, timeHelper.getCurrentTime()], function (error, result, fields) {
                                            if (error) {
                                                reject({ message: message.INTERNAL_SERVER_ERROR });
                                            } else {
                                                resolve("ok")
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                
            }
        })
    })
}

/**
 * get order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOrder(uid, id) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from ' + table.PRODUCTS + ' where orderID = ?'

        db.query(query, [ id ],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve(rows[0]);
                }
            }
        })
    })
}


/**
 * update Order only order table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateOrder(id, data) {
    return new Promise(async (resolve, reject) => {
        let query = `Update ` + table.PRODUCTS + ` set buyer_type = ?, billing_cycle = ?, renewal = ?, name = ?, description = ?, price_type = ?, price = ?, vat_option = ?, vat_fee = ?, updated_at = ? where orderID = ? `
        db.query(query, [data.buyer_type, data.billing_cycle, data.renewal, data.name, data.description, data.price_type, data.price, data.vat_option, data.vat_fee, timeHelper.getCurrentTime(), id], function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                resolve("ok")
            }
        })
    })
}

/**
 * delete order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteOrder(uid, id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.PRODUCTS + ' SET  permission = ?, deleted_by = ?, deleted_at = ? where orderID = ?'
  
        db.query(query, [ data.status, uid, timeHelper.getCurrentTime(), id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }

/**
 * delete all order
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteAllOrder() {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.PRODUCTS + ' SET  permission = "deleted" where  permission = "trash"'
  
        db.query(query, [], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }
module.exports = orderModel

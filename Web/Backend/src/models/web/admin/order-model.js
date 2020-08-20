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
const orderTemplate = require('../../../invoiceTemplate/order')
const ownerTemplate = require('../../../invoiceTemplate/owner')
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
var zip=require('adm-zip');

var orderModel = {
    getFilterList: getFilterList,
    getOrderList: getOrderList,
    getCountOrderList: getCountOrderList,
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    deleteAllOrder: deleteAllOrder,
    getBuyerList: getBuyerList,
    getDiscountCodeListByType: getDiscountCodeListByType,
    downloadInvoiceOrder: downloadInvoiceOrder,
    downloadInvoiceOwner: downloadInvoiceOwner,
    downloadInvoiceBuilding: downloadInvoiceBuilding,
    downloadZipOrder: downloadZipOrder,
    downloadZipOwner: downloadZipOwner,
    downloadZipBuilding: downloadZipBuilding,
    getChartList: getChartList
}

function getFilterList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = 'Select companyID, name from companies where permission = "active"'
        let companies
        let buildings
        db.query(query, [], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                companies = rows
                let query
                let params
                if (data.companyID == -1) {
                    query = 'Select buildingID, name from buildings where permission = "active"'
                    params = []
                } else {
                    query = 'Select buildingID, name from buildings where permission = "active" and companyID = ?'
                    params = [data.companyID]
                }
                db.query(query, params, (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        buildings = rows
                        let query = 'Select productID, name from products where permission = "active" and buyer_type = ?'
                        db.query(query, [data.type], (error, rows, fields) => {
                            if (error)
                                reject({ message: message.INTERNAL_SERVER_ERROR })
                            else {
                                products = rows
                                resolve({companies: companies, buildings: buildings, products: products})
                            }
                        })
                    }
                })
            }
        })
    })
}

function getChartItem(query, params) {
    return new Promise((resolve, reject)=> {
        db.query(query, params, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0])
            }
        })
    })
}
function getChartList(uid, data) {
    return new Promise(async (resolve, reject) => {
        let query = 'Select ifnull(sum(price * apartment_amount), 0) price, count(price) count from orders where permission = "active" and buyer_type = ?'
        let filter = []
        let filter_1 = []
        let params = [data.type]
        let result = []
        let result_total = []
        if (data.companyID == -1) {
        } else {
            query += ' and companyID = ? '
            params.push(data.companyID)
        }
        if (data.buildingID == -1) {

        } else {
            query += ' and buildingID = ? '
            params.push(data.buildingID)
        }
        if (data.productID == -1) {

        } else {
            query += ' and productID = ? '
            params.push(data.productID)
        }

        var ourDate = new Date()
        var tempDate
        if (data.duration === 7) {
            for (var i = 7; i >= 0; i --) {
                tempDate = new Date()
                tempDate.setDate(ourDate.getDate() - i)
                filter.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            }
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 14)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 7)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 0)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            console.log(filter)
        } else if (data.duration === 30) {
            for (var i = 30; i >= 0; i -= 3 ) {
                tempDate = new Date()
                tempDate.setDate(ourDate.getDate() - i)
                filter.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            }
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 60)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 30)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 0)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
        } else if (data.duration === 90) {
            for (var i = 90; i>= 0; i -= 9) {
                tempDate = new Date()
                tempDate.setDate(ourDate.getDate() - i)
                filter.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            }
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 180)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 90)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 0)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
        } else if (data.duration === 365) {
            for (var i = 360; i >= 0; i -= 30) {
                tempDate = new Date()
                tempDate.setDate(ourDate.getDate() - i)
                filter.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            }
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 730)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 365)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
            tempDate = new Date()
            tempDate.setDate(ourDate.getDate() - 0)
            filter_1.push(JSON.stringify(tempDate).split('T')[0].replace('"',''))
        }
        query += ' and DATE(created_at) > DATE(?) and DATE(created_at) <= DATE(?)'
        for (var j = 0;j < filter.length - 1; j ++) {
            params.push(filter[j])
            params.push(filter[j + 1])
            var temp = await getChartItem(query, params)
            result.push(temp)
            params.pop()
            params.pop()
            
        }
        for (j = 0;j < filter_1.length - 1; j ++) {
            params.push(filter_1[j])
            params.push(filter_1[j + 1])
            var temp = await getChartItem(query, params)
            result_total.push(temp)
            params.pop()
            params.pop()
            
        }
        
        resolve({filter: filter, result: result, result_total: result_total})
    })
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
                    *, orderID ID, if(end_date = "9999-12-31", "", end_date) end_date,
                    ROUND(if (discount_codeID > 0, 
                        if (discount_type = "fixed", 
                            if(vat_option="true", 
                                if(price_type = "per_apartment", price * apartment_amount, price) * (100 + vat_fee) / 100, 
                                if(price_type = "per_apartment", price * apartment_amount, price)) - discount_amount, 
                            if(vat_option="true", 
                                if(price_type = "per_apartment", price * apartment_amount, price) * (100 + vat_fee) / 100, 
                                if(price_type = "per_apartment", price * apartment_amount, price)) / 100 * (100 - discount_amount)
                        ),
                        if(vat_option="true", 
                                if(price_type = "per_apartment", price * apartment_amount, price) * (100 + vat_fee) / 100, 
                                if(price_type = "per_apartment", price * apartment_amount, price))
                    ),2) price_with_vat
                    FROM orders
                    WHERE permission = ? and buyer_type = ? and buyer_name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [data.status, data.type, search_key]
        if (data.type === "managers" ) {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
        } else if (data.type === "owners") {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
            if (data.buildingID != -1) {
                query += ` and buildingID = ? `
                params.push(data.buildingID)
            }
        } else if (data.type === "buildings") {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
            if (data.buildingID != -1) {
                query += ` and buildingID = ? `
                params.push(data.buildingID)
            }
        }
        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);

        if (sort_column === -1)
            query += ' order by orderID desc';
        else {
            if (sort_column === 0)
                query += ' order by orderID ';
            else if (sort_column === 1)
                query += ' order by buyer_name ';
            else if (sort_column === 2)
                query += ' order by start_date ';
            else if (sort_column === 3)
                query += ' order by price_with_vat ';
            else if (sort_column === 4)
                query += ' order by orderID ';
            else if (sort_column === 5)
                query += ' order by end_date ';
            else if (sort_column === 6)
                query += ' order by status ';
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
        WHERE permission = ? and buyer_type = ? and buyer_name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [data.status, data.type, search_key]   
        if (data.type === "managers" ) {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
        } else if (data.type === "owners") {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
            if (data.buildingID != -1) {
                query += ` and buildingID = ? `
                params.push(data.buildingID)
            }
        } else if (data.type === "buildings") {
            if (data.companyID != -1) {
                query += ` and companyID = ? `
                params.push(data.companyID)
            }
            if (data.buildingID != -1) {
                query += ` and buildingID = ? `
                params.push(data.buildingID)
            }
        }
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
                    c.companyID buyerID, c.companyID, c.name
                    FROM users u left join user_relationship r on u.userID = r.userID left join companies c on r.relationID = c.companyID
                    WHERE c.permission = "active" and u.userID = ? and r.type="company"`
        else if (data.buyer_type === "buildings")
            query = `Select
                    b.buildingID buyerID, c.companyID, b.buildingID, b.name
                    FROM users u left join user_relationship r on u.userID = r.userID left join companies c on r.relationID = c.companyID left join buildings b on c.companyID = b.companyID
                    WHERE c.permission = "active" and b.permission = "active" and u.userID = ? and r.type="company"`
        else if (data.buyer_type === "owners")
            query = `SELECT
                    s.userID buyerID, c.companyID, b.buildingID, if(s.type = "Company", s.owner_company_name, CONCAT(s.firstname, ' ', s.lastname)) name 
                    FROM
                        users u
                        LEFT JOIN user_relationship r ON u.userID = r.userID
                        LEFT JOIN companies c ON r.relationID = c.companyID
                        LEFT JOIN buildings b ON c.companyID = b.companyID
                        INNER JOIN (
                        SELECT
                            rel.relationID, o.userID, o.firstname, o.lastname, o.owner_company_name, o.type
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
                        AND u.userID = ? and r.type="company"`
        db.query(query, [uid], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                result = []
                for (var i in rows) {
                    var sign = false;
                    for (var j in result) {
                        if (rows[i].buyerID == result[j].buyerID)
                            sign = true;
                    }
                    if (sign == false)
                        result.push(rows[i])
                }
                resolve(result);
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
        if (data.user_type === "managers")
            data.user_type = "companies"
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
                if (discount_codes.length > 0) {
                    data.discount_type = discount_codes[0].discount_type
                    data.discount_amount = discount_codes[0].discount_amount
                    data.amount_of_use = discount_codes[0].amount_of_use
                    data.amount_of_use_per_user = discount_codes[0].amount_of_use_per_user
                } else {
                    data.discount_type = "fixed"
                    data.discount_amount = 0
                }
                let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash")`
                db.query(query, [data.discount_codeID], (error, rows, fields) => {
                    if (error)
                        reject({ message: message.INTERNAL_SERVER_ERROR})
                    else {
                        if (data.discount_codeID > 0 && data.amount_of_use != -1 && rows[0].count + 1 > data.amount_of_use)
                            reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE})
                        else {
                            let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash") and buyerID = ? and buyer_type = ?`
                            db.query(query, [data.discount_codeID, data.buyerID, data.buyer_type], (error, rows, fields) => {
                                if (error)
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                else {
                                    if (data.discount_codeID > 0 && data.amount_of_use_per_user != -1 && rows[0].count + 1 > data.amount_of_use_per_user)
                                        reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE })
                                    else {
                                        if (data.price_type === "per_unit")
                                            data.apartment_amount = 1
                                        let query = `Insert into ` + table.ORDERS + ` (buyer_type, productID, companyID, buildingID, buyerID, buyer_name, billing_cycle, renewal, price_type, price, vat_option, vat_fee, apartment_amount, start_date, end_date, payment_method, discount_codeID, discount_type, discount_amount, status, permission, created_by, created_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                                        db.query(query, [data.buyer_type, data.productID, data.companyID, data.buildingID, data.buyerID, data.buyer_name, data.billing_cycle, data.renewal, data.price_type, data.price, data.vat_option, data.vat_fee, data.apartment_amount, data.start_date, data.end_date, data.payment_method, data.discount_codeID, data.discount_type, data.discount_amount, data.status, "active", uid, timeHelper.getCurrentTime()], function (error, result, fields) {
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
        let query = 'Select * from ' + table.ORDERS + ' where orderID = ?'

        db.query(query, [ id ],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    if (rows[0].end_date === "9999-12-31")
                        rows[0].end_date = ""
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
    return new Promise((resolve, reject) => {
        if (data.end_date === undefined || data.end_date === "" || data.end_date === null)
                data.end_date = "9999-12-31"
        let query = `Select * from ` + table.DISCOUNTCODES + ` where discount_codeID = ?`
        db.query(query, [data.discount_codeID], (error, rows, fields)=> {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR})
            } else {
                let discount_codes = rows
                if (discount_codes.length > 0) {
                    data.discount_type = discount_codes[0].discount_type
                    data.discount_amount = discount_codes[0].discount_amount
                    data.amount_of_use = discount_codes[0].amount_of_use
                    data.amount_of_use_per_user = discount_codes[0].amount_of_use_per_user
                }
                let query = `Select * from ` + table.ORDERS + ` where orderID = ?`
                db.query(query, [id], (error, rows, fields) => {
                    if (error)
                        reject({ message: message.INTERNAL_SERVER_ERROR})
                    else {
                        let order = rows[0]
                        let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash")`
                        db.query(query, [data.discount_codeID], (error, rows, fields) => {
                            if (error)
                                reject({ message: message.INTERNAL_SERVER_ERROR})
                            else {
                                if (data.discount_codeID > 0 && data.discount_codeID != order.discount_codeID && data.amount_of_use != -1 && rows[0].count + 1 > data.amount_of_use)
                                    reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE})
                                else {
                                    let query = `Select count(*) count from ` + table.ORDERS + ` where discount_codeID = ? and (permission = "active" or permission = "trash") and buyerID = ? and buyer_type = ?`
                                    db.query(query, [data.discount_codeID, data.buyerID, data.buyer_type], (error, rows, fields) => {
                                        if (error)
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        else {
                                            if (data.discount_codeID > 0 && data.discount_codeID != order.discount_codeID && data.amount_of_use_per_user != -1 && rows[0].count + 1 > data.amount_of_use_per_user)
                                                reject({ message: message.NOT_USE_THIS_DISCOUNT_CODE })
                                            else {
                                                if (data.price_type === "per_unit")
                                                    data.apartment_amount = 1
                                                let query = `Update ` + table.ORDERS + ` Set buyer_type = ?, productID = ?, companyID = ?, buildingID = ?, buyerID = ?, buyer_name = ?, billing_cycle = ?, renewal = ?, price_type = ?, price = ?, vat_option = ?, vat_fee = ?, apartment_amount = ?, start_date = ?, end_date = ?, payment_method = ?, discount_codeID = ?, discount_type = ?, discount_amount = ?, status = ?, updated_at = ? where orderID = ?`;
                                                db.query(query, [data.buyer_type, data.productID, data.companyID, data.buildingID, data.buyerID, data.buyer_name, data.billing_cycle, data.renewal, data.price_type, data.price, data.vat_option, data.vat_fee, data.apartment_amount, data.start_date, data.end_date, data.payment_method, data.discount_codeID, data.discount_type, data.discount_amount, data.status, timeHelper.getCurrentTime(), id], function (error, result, fields) {
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
        let query = 'UPDATE ' + table.ORDERS + ' SET  permission = ?, deleted_by = ?, deleted_at = ? where orderID = ?'
  
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
        let query = 'UPDATE ' + table.ORDERS + ' SET  permission = "deleted" where  permission = "trash"'
  
        db.query(query, [], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }

  /**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadInvoiceOrder(data, res) {
    return new Promise((resolve, reject) => {
        let query = `Select c.name name, c.address address, c.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.apartment_amount amount_lot, o.price price, o.start_date date, o.price * o.apartment_amount total
                     from orders o left join companies c on o.companyID = c.companyID left join products p on o.productID = p.productID where o.orderID = ?`
        db.query(query, [data.orderID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                data = rows[0]
                options = {format: "A3"}
                pdf.create(orderTemplate(data), options).toBuffer(function (err, buffer) {
                    if (err) return res.send(err);
                    res.type('pdf');
                    res.end(buffer, 'binary');
                });
            }
        })
        

    })
}

/**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadInvoiceBuilding(data, res) {
    return new Promise((resolve, reject) => {
        let query = `Select b.name name, b.address address, c.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.apartment_amount amount_lot, o.price price, o.start_date date, 
        ROUND(if (o.discount_codeID > 0, 
            if (o.discount_type = "fixed", 
                if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price)) - discount_amount, 
                if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price)) / 100 * (100 - o.discount_amount)
            ),
            if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price))
        ),2) total
                     from orders o left join companies c on o.companyID = c.companyID left join products p on o.productID = p.productID left join buildings b on o.buildingID = b.buildingID where o.orderID = ? and o.buyer_type = "buildings"`
        db.query(query, [data.orderID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                data = rows[0]
                options = {format: "A3"}
                pdf.create(orderTemplate(data), options).toBuffer(function (err, buffer) {
                    if (err) return res.send(err);
                    res.type('pdf');
                    res.end(buffer, 'binary');
                });
            }
        })
        

    })
}

/**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadInvoiceOwner(data, res) {
    return new Promise((resolve, reject) => {
        let query = `Select if (ow.type = "Company", ow.owner_company_name, CONCAT(ow.firstname, ' ', ow.lastname)) name, ow.address address, ow.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.price price, o.start_date date
                     from orders o left join users ow on o.buyerID = ow.userID left join products p on o.productID = p.productID where o.orderID = ?`
        db.query(query, [data.orderID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                data = rows[0]
                options = {format: "A3"}
                pdf.create(ownerTemplate(data), options).toBuffer(function (err, buffer) {
                    if (err) return res.send(err);
                    res.type('pdf');
                    res.end(buffer, 'binary');
                });
            }
        })
        

    })
}
function createPDF(data, options) {
    return new Promise((resolve, reject) => {
        pdf.create(orderTemplate(data), options).toFile('public/download/' + data.order_id + '.pdf', function (err, buffer) {
            resolve("OK")
        })
    })

}
function removeFiles() {
    return new Promise((resolve, reject) => {
        const directory = 'public/download/';
    
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
        
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        resolve("OK")
    })
        
}
/**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadZipOrder(data, res) {
    return new Promise(async (resolve, reject) => {
        await removeFiles()   
        let query = `Select c.name name, c.address address, c.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.apartment_amount amount_lot, o.price price, o.start_date date, o.price * o.apartment_amount total
                        from orders o left join companies c on o.companyID = c.companyID left join products p on o.productID = p.productID where o.permission = "active" and o.buyer_type = "managers" and o.buyer_name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [search_key]
        if (data.companyID != -1) {
            query += ` and o.companyID = ? `
            params.push(data.companyID)
        }
        db.query(query, params, async (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                options = {format: "A3"}
                for (var i in rows) {
                    await createPDF(rows[i], options)
                }
                const file = new zip();
                time = timeHelper.getCurrentDate()
                file.addLocalFolder('public/download/');
                file.writeZip('public/download/'+ time + '.zip');
                var read_file = fs.readFileSync("public/download/" + time +'.zip');
                res.setHeader('Content-Length', read_file.length);
                res.write(read_file, 'binary');
                res.end();
            }
        })
        
        
    })
}

/**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadZipBuilding(data, res) {
    return new Promise(async (resolve, reject) => {
        await removeFiles()
        let query = `Select b.name name, b.address address, c.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.apartment_amount amount_lot, o.price price, o.start_date date,
        ROUND(if (o.discount_codeID > 0, 
            if (o.discount_type = "fixed", 
                if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price)) - discount_amount, 
                if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price)) / 100 * (100 - o.discount_amount)
            ),
            if(o.vat_option="true", 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price) * (100 + o.vat_fee) / 100, 
                    if(o.price_type = "per_apartment", o.price * o.apartment_amount, o.price))
        ),2) total
                     from orders o left join companies c on o.companyID = c.companyID left join products p on o.productID = p.productID left join buildings b on o.buildingID = b.buildingID where o.permission = "active" and o.buyer_type = "buildings" and o.buyer_name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [search_key]
        if (data.companyID != -1) {
            query += ` and o.companyID = ? `
            params.push(data.companyID)
        }
        if (data.buildingID != -1) {
            query += ` and o.buildingID = ? `
            params.push(data.buildingID)
        }
        db.query(query, params, async (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                options = {format: "A3"}
                for (var i in rows) {
                    await createPDF(rows[i], options)
                }
                const file = new zip();
                time = timeHelper.getCurrentDate()
                file.addLocalFolder('public/download/');
                file.writeZip('public/download/'+ time + '.zip');
                var read_file = fs.readFileSync("public/download/" + time +'.zip');
                res.setHeader('Content-Length', read_file.length);
                res.write(read_file, 'binary');
                res.end();
            }
        })
        

    })
}

/**
 * download invoice
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function downloadZipOwner(data, res) {
    return new Promise(async (resolve, reject) => {
        await removeFiles()
        let query = `Select if (ow.type = "Company", ow.owner_company_name, CONCAT(ow.firstname, ' ', ow.lastname)) name, ow.address address, ow.email email, o.orderID invoice_number, o.start_date invoice_date, o.orderID order_id, o.start_date order_date, p.name product_name, o.price price, o.start_date date
                     from orders o left join users ow on o.buyerID = ow.userID left join products p on o.productID = p.productID where o.permission = "active" and o.buyer_type = "owners" and o.buyer_name like ? `
        search_key = '%' + data.search_key + '%'
        let params = [search_key]
        if (data.companyID != -1) {
            query += ` and o.companyID = ? `
            params.push(data.companyID)
        }
        if (data.buildingID != -1) {
            query += ` and o.buildingID = ? `
            params.push(data.buildingID)
        }
        db.query(query, params, async (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                options = {format: "A3"}
                for (var i in rows) {
                    await createPDF(rows[i], options)
                }
                const file = new zip();
                time = timeHelper.getCurrentDate()
                file.addLocalFolder('public/download/');
                file.writeZip('public/download/'+ time + '.zip');
                var read_file = fs.readFileSync("public/download/" + time +'.zip');
                res.setHeader('Content-Length', read_file.length);
                res.write(read_file, 'binary');
                res.end();
            }
        })
        

    })
}
module.exports = orderModel

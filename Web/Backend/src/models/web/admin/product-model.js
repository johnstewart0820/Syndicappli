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

var productModel = {
    getProductList: getProductList,
    getCountProductList: getCountProductList,
    createProduct: createProduct,
    getProduct: getProduct,
    updateProduct_info: updateProduct_info,
    updateProduct: updateProduct,
    delete_apartments: delete_apartments,
    deleteProduct: deleteProduct,
    updateProductStatus: updateProductStatus
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getProductList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT
                    *, users.userID ID, users.phone phone, users.email email
                    FROM users
                    LEFT JOIN user_relationship USING ( userID ) 
                    LEFT JOIN buildings ON user_relationship.relationID = buildings.buildingID 
                    Left join companies using (companyID)
                    LEFT JOIN ( SELECT count( buildingID ) count, buildingID, userID FROM apartments LEFT JOIN buildings USING ( buildingID ) GROUP BY apartments.buildingID, apartments.userID ) s ON buildings.buildingID = s.buildingID and users.userID = s.userID
                    WHERE users.usertype = "product" and users.firstname like ? and users.permission = ? and s.count > 0 `

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        let params = [search_key, data.status];
        if (data.role !== "all") {
            query += 'and users.product_role = ? ';
            params.push(data.role)
        }
        if (data.buildingID != -1) {
            query += ` and buildings.buildingID = ?`
            params.push(data.buildingID)
        }
        else if (data.companyID != -1) {
            query += ` and companies.companyID = ?`
            params.push(data.companyID)
        }

        if (sort_column === -1)
            query += ' order by users.userID desc';
        else {
            if (sort_column === 0)
                query += ' order by users.lastname ';
            else if (sort_column === 1)
                query += ' order by users.firstname ';
            else if (sort_column === 2) {
                query += ' order by users.email ';
            }
            else if (sort_column === 3) {
                query += ' order by users.phone ';
            }
            else if (sort_column === 4) {
                query += ' order by users.product_role ';
            } else if (sort_column === 5) {
                query += ' order by s.count ';
            }
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
function getCountProductList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT
                    count(*) count
                    FROM users
                    LEFT JOIN user_relationship USING ( userID )
                    LEFT JOIN buildings ON user_relationship.relationID = buildings.buildingID 
                    Left join companies using (companyID)
                    LEFT JOIN ( SELECT count( buildingID ) count, buildingID, userID FROM apartments LEFT JOIN buildings USING ( buildingID ) GROUP BY apartments.buildingID, apartments.userID ) s ON buildings.buildingID = s.buildingID and users.userID = s.userID
                    WHERE users.usertype = "product" and users.firstname like ? and users.permission = ? and s.count > 0 `
        let params = [search_key, data.status];
        if (data.role !== "all") {
            query += 'and users.product_role = ? ';
            params.push(data.role)
        }

        if (data.buildingID != -1) {
            query += ` and buildings.buildingID = ?`
            params.push(data.buildingID)
        }
        else if (data.companyID != -1) {
            query += ` and companies.companyID = ?`
            params.push(data.companyID)
        }
        search_key = '%' + data.search_key + '%'

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
 * create Product only product table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createProduct(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `Insert into ` + table.PRODUCTS + ` (buyer_type, billing_cycle, renewal, name, description, price_type, price, vat_option, vat_fee, created_by, created_at) values (?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(query, [data.buyer_type, data.billing_cycle, data.renewal, data.name, data.description, data.price_type, data.price, data.vat_option, data.vat_fee, uid, timeHelper.getCurrentTime()], function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                resolve("ok")
            }
        })
    })
}

/**
 * get product
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getProduct(uid, data, id) {
    return new Promise((resolve, reject) => {
        let query = 'Select *, users.type usertype, users.email email, users.phone phone, users.address address, users.status status from ' + table.USERS + ' left join ' + table.USER_RELATIONSHIP + ' using (userID) left join '+  table.BUILDINGS + ' on buildings.buildingID = user_relationship.relationID left join ' + table.COMPANIES + ' using (companyID) where users.userID = ? and buildings.buildingID = ?'
        let productInfo;
        let vote_amount_info;
        let apartment_info;
        db.query(query, [ id, data.buildingID],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    productInfo = rows[0];
                    let query = 'Select * from ' + table.BUILDINGS + ' b left join ' + table.APARTMENTS + ' a using (buildingID) where b.buildingID = ? and a.userID = ?'
                    db.query(query, [data.buildingID, id], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            apartment_info = rows;
                            let query = 'Select * from ' + table.BUILDINGS + ' b left join ' + table.APARTMENTS + ' a using (buildingID) left join ' + table.VOTE_AMOUNT_OF_PARTS + ' va using (apartmentID) left join ' + table.VOTE_BUILDING_BRANCH + ' vb using(voteID) where b.buildingID = ? and a.userID = ? and vb.buildingID = ?'
                            db.query(query, [data.buildingID, id, data.buildingID],  (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    vote_amount_info = rows;
                                    resolve({productInfo: productInfo, amount_info: vote_amount_info, apartment_info: apartment_info});
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}


/**
 * update Product only product table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProduct_info(id, data, files) {
    return new Promise(async (resolve, reject) => {
        
        let photo_url = ""
        let id_front = ""
        let id_back = ""

        if (files.photo_url) {
            uploadS3 = await s3Helper.uploadLogoS3(files.photo_url[0], s3buckets.AVATAR)
            photo_url = uploadS3.Location
        } 
        if (files.id_card_front) {
            uploadS3 = await s3Helper.uploadLogoS3(files.id_card_front[0], s3buckets.IDENTITY_IMAGE)
            id_front = uploadS3.Location
        }
        if (files.id_card_back) {
            uploadS3 = await s3Helper.uploadLogoS3(files.id_card_back[0], s3buckets.IDENTITY_IMAGE)
            id_back = uploadS3.Location    
        }
        
        let query = `Select * from ` + table.USERS + ` where userID = ?`
        db.query(query, [id], (error, result, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                if (result.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR });
                } else {
                    if (photo_url == "")
                        photo_url = result[0].photo_url
                    if (id_front == "")
                        id_front = result[0].identity_card_front
                    if (id_back == "")
                        id_back = result[0].identity_card_back
                    let query = `Update ` + table.USERS + ` set type = ?, product_role = ?, firstname = ?, lastname = ?, firstname_1 = ?, lastname_1 = ?, product_company_name = ?, email = ?, address = ?, phone = ?, photo_url = ?, identity_card_front = ?, identity_card_back = ?, updated_at = ? where userID = ? `
                    db.query(query, [data.type, data.product_role, data.firstname, data.lastname, data.firstname_1, data.lastname_1, data.product_company_name, data.email, data.address, data.phone, photo_url, id_front, id_back, timeHelper.getCurrentTime(), id], async function (error, result, fields) {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR });
                        } else {
                            resolve("ok")
                        }
                    })
                }
            }
        })        
    })
}


/**
 * delete apartments related to the product
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function delete_apartments(data, id) {
    return new Promise(async (resolve, reject) => {
        let query = `Select * from ` + table.APARTMENTS + ` where userID = ? and buildingID = ?`
        let apartments = [];
        db.query(query, [id, data.buildingID], function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                apartments = result;
                let query = `Delete from ` + table.APARTMENTS + ` where userID = ? and buildingID = ?`
                db.query(query, [id, data.buildingID], function (error, result, fields) {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR });
                    } else {
                        for (let i in apartments) {
                            let query = `Delete from ` + table.VOTE_AMOUNT_OF_PARTS + ` where apartmentID = ?`
                            db.query(query, [apartments[i].apartmentID], function (error, results, fields) {
                                if (error ){ 
                                    reject({ message: message.INTERNAL_SERVER_ERROR });
                                }
                            })
                        }
                        resolve("ok")
                    }
                })
            }
        })
        
    })
}



/**
 * update product
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProduct(uid, data) {
    return new Promise((resolve, reject) => {
        let query = 'Insert into ' + table.USERS + ' (companyID, name, address, account_holdername, account_address, account_IBAN) values (?, ?, ?, ?, ?, ?)'
        let select_building_query = 'Select * from ' + table.BUILDINGS + ' order by created_at desc limit 1'
        db.query(query, [ data.companyID, data.name, data.address, data.account_holdername, data.account_address, data.account_IBAN ],  async (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                await db.query(select_building_query, [],  async (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR });
                    } else {
                        let buildingID = rows[0].buildingID;
                        for (let i in data.vote) {
                            let query = 'Insert into ' + table.VOTEBRANCH + ' (name) values (?)'
                            let select_query = 'Select * from ' + table.VOTEBRANCH + ' where name = ?'
                            let insert_query = 'Insert into ' + table.BUILDING_VOTE_BRANCH + ' (buildingID, voteID) values (?, ?)'
                            await db.query(query, [ data.vote[i].name ], async (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    await db.query(select_query, [ data.vote[i].name ], (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR})
                                        } else {
                                            db.query(insert_query, [ buildingID, rows[rows.length - 1].voteID ], (error, rows, fields) => {
                                                if (error) {
                                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
                resolve("ok");
            }
        })
    })
}

/**
 * update product status
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProductStatus(id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.USERS + ' SET  status = ? where userID = ?'
  
        db.query(query, [ data.status, id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }

/**
 * delete product
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteProduct(uid, id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.USERS + ' SET  permission = ?, deleted_by = ?, deleted_at = ? where userID = ?'
  
        db.query(query, [ data.status, uid, timeHelper.getCurrentTime(), id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }
module.exports = productModel

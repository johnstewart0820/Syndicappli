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

var db = require('../../database/database')
var message  = require('../../constants/message')
var bcrypt = require('bcrypt-nodejs')
var table  = require('../../constants/table')
const s3Helper = require('../../helper/s3helper')
const s3buckets = require('../../constants/s3buckets')
const timeHelper = require('../../helper/timeHelper')

var ownerModel = {
    getOwnerList: getOwnerList,
    getCountOwnerList: getCountOwnerList,
    createOwner: createOwner,
    getOwner: getOwner,
    updateOwner: updateOwner
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOwnerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select o.*,
                  (select count(*) from ` + table.APARTMENTS + ` a left join ` + table.VOTE_AMOUNT_OF_PARTS + ` va on va.apartmentID = a.apartmentID where a.userID = o.userID) as apartment_count
                  from ` + table.USERS + ` o
                  where o.firstname like ? and o.usertype = "owner" and o.permission = "active" and o.status = "active"`
        if (data.buildingID !== "-1") {
            query += ` and o.builingID in (` + data.buildingID + `)`
        }

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by o.userID desc';
        else {
            if (sort_column === 0)
                query += ' order by o.lastname ';
            else if (sort_column === 1)
                query += ' order by o.firstname ';
            else if (sort_column === 2) {
                query += ' order by o.email ';
            }
            else if (sort_column === 3) {
                query += ' order by o.phone ';
            }
            else if (sort_column === 4) {
                query += ' order by o.onwer_role ';
            }
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, [search_key], (error, rows, fields) => {
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
function getCountOwnerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select count(*) count
                  from ` + table.USERS + ` o
                  where o.firstname like ? and o.usertype = "owner" and o.permission = "active" and o.status = "active"`
        if (data.buildingID !== "-1") {
            query += ` and o.builingID in (` + data.buildingID + `)`
        }
        search_key = '%' + data.search_key + '%'

        db.query(query, [search_key], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}


/**
 * create owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createOwner(uid, data, files) {
    return new Promise((resolve, reject) => {
        let confirm_query = `Select * from ` + table.USERS + ` where email = ?`;
    
        db.query(confirm_query, [ data.email ],  async function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (result.length == 0) {
                    let photo_url = ""
                    let id_front = ""
                    let id_back = ""
                    uploadS3 = await s3Helper.uploadLogoS3(files[0], s3buckets.IDENTITY_IMAGE)
                    photo_url = uploadS3.Location
                    uploadS3 = await s3Helper.uploadLogoS3(files[1], s3buckets.IDENTITY_IMAGE)
                    id_front = uploadS3.Location
                    uploadS3 = await s3Helper.uploadLogoS3(files[2], s3buckets.IDENTITY_IMAGE)
                    id_back = uploadS3.Location    
                
                    let password = bcrypt.hashSync("123456")
                    let query = `Insert into ` + table.USERS + ` (usertype, type, buildingID, owner_role, firstname, lastname, owner_company_name, password, email, address, phone, photo_url, identity_card_front, identity_card_back, status, permission, created_by, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    await db.query(query, ["owner", data.type, data.buildingID, data.owner_role, data.firstname, data.lastname, data.owner_company_name, password, data.email, data.address, data.phone, photo_url, id_front, id_back, "active", "active", uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } 
                    })
                } else {
                    if ( !result[0].buildingID.split(',').includes(data.buildingID)) {
                        let buildingID = result[0].buildingID + ',' + data.buildingID;
                        let query = `Update ` + table.USERS + ` SET buildingID = ? where userID = ?`
                        await db.query(query, [buildingID, result[0].userID], (error, rows, fields) => {
                            if (error) {
                                reject({ message: message.INTERNAL_SERVER_ERROR })
                            }
                        })
                    }
                }
                
                let query = `Select * from ` + table.USERS + ` where email = ?`;
                db.query(query, [ data.email ], (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        let id = rows[0].userID;
                        for (let i in data.vote_value_list) {
                            let vote_value = data.vote_value_list[i];
                            let query = `Select * from ` + table.APARTMENTS + ` where userID = ?  and apartment_number = ? and buildingID = ?`
                            db.query(query, [id, vote_value.apartment_number, data.buildingID], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    if (rows.length == 0) {
                                        let query = `Insert into ` + table.APARTMENTS + ` (userID, apartment_number, buildingID, created_by, created_at, updated_at) values (?, ?, ?, ?, ?, ?)`
                                        db.query(query, [id, vote_value.apartment_number, data.buildingID, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields) => {
                                            if (error) {
                                                reject({ message: message.INTERNAL_SERVER_ERROR })
                                            } else {
                                                let query = `Select * from ` + table.APARTMENTS + ` where userID = ? and apartment_number = ?`
                                                db.query(query, [id, vote_value.apartment_number], (error, rows, fields) => {
                                                    if (error) {
                                                        reject({ message: message.INTERNAL_SERVER_ERROR })
                                                    } else {
                                                        let apartment_id = rows[0].apartmentID;
                                                        for (let i in vote_value.vote) {
                                                            let vote = vote_value.vote[i];
                                                            let query = `Select * from ` + table.VOTE_AMOUNT_OF_PARTS + ` where apartmentID = ? and voteID = ?`
                                                            db.query(query, [apartment_id, vote.voteID], (error, rows, fields) => {
                                                                if (error) {
                                                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                                                } else {
                                                                    if (rows.length == 0) {
                                                                        let query = `Insert into ` + table.VOTE_AMOUNT_OF_PARTS + ` (apartmentID, voteID, amount, created_by, created_at, updated_at) values (?, ?, ?, ?, ?, ?)`
                                                                        db.query(query, [apartment_id, vote.voteID, vote.vote_amount, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields) => {
                                                                            if (error) {
                                                                                reject({ message: message.INTERNAL_SERVER_ERROR })
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
 * get owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOwner(uid, data) {
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
 * update owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateOwner(uid, data) {
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
module.exports = ownerModel

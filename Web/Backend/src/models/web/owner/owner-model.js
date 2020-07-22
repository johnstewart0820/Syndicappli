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

var ownerModel = {
    getOwnerList: getOwnerList,
    getCountOwnerList: getCountOwnerList,
    createOwner_info: createOwner_info,
    createBuildingRelationShip: createBuildingRelationShip,
    createOwner: createOwner,
    getOwner: getOwner,
    updateOwner_info: updateOwner_info,
    updateOwner: updateOwner,
    delete_apartments: delete_apartments,
    deleteOwner: deleteOwner
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOwnerList(uid) {
    return new Promise((resolve, reject) => {
        let query = `select * from users where created_by = ?`

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
function getCountOwnerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT
                    count(*) count
                    FROM users
                    LEFT JOIN user_relationship USING ( userID )
                    LEFT JOIN buildings ON user_relationship.relationID = buildings.buildingID 
                    Left join companies using (companyID)
                    LEFT JOIN ( SELECT count( buildingID ) count, buildingID, userID FROM apartments LEFT JOIN buildings USING ( buildingID ) GROUP BY apartments.buildingID, apartments.userID ) s ON buildings.buildingID = s.buildingID and users.userID = s.userID
                    WHERE users.usertype = "owner" and users.firstname like ? and users.permission = "active" `
        let params = [search_key];
        if (data.role !== "all") {
            query += 'and users.owner_role = ? ';
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
 * create Owner only owner table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createOwner_info(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `Select * from ` + table.USERS + ` where email = ?`;
        db.query(query, [data.email], function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                if (result.length == 0) {
                    let password = bcrypt.hashSync("123456")
                    let query = `Insert into ` + table.USERS + ` (usertype, type, owner_role, firstname, lastname, owner_company_name, password, email, address, phone, status, invitation_status, permission, created_by, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, ["owner", data.type, "subaccount", data.firstname, data.lastname, data.owner_company_name, password, data.email, data.address, data.phone, "active", "invited", "active", uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            resolve("ok")
                        }
                    })
                } else {
                    reject({ message: message.INTERNAL_SERVER_ERROR });
                }
            }
        })
    })
}

/**
 * create Owner Relation Ship
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createBuildingRelationShip(data) {
    return new Promise((resolve, reject) => {
        let query = `Select * from ` + table.USERS + ` where email = ?`;
        db.query(query, [data.email], function (error, result, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
            } else {
                if (result.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR });
                } else {
                    let query = `Insert into ` + table.USER_RELATIONSHIP + ` (userID, type, relationID) VALUES (?,?,?)`
                    db.query(query, [result[0].userID, "building", data.buildingID], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            resolve(result[0].userID)
                        }
                    })
                }
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
function createOwner(uid, data, ownerID) {
    return new Promise((resolve, reject) => {
        let id = ownerID;
        let vote_value_list = JSON.parse(data.vote_value_list);
        for (let i in vote_value_list) {
            let vote_value = vote_value_list[i];
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
                                let query = `Select * from ` + table.APARTMENTS + ` where userID = ? and apartment_number = ? and buildingID = ?`
                                db.query(query, [id, vote_value.apartment_number, data.buildingID], (error, rows, fields) => {
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
                resolve("ok");
            }) 
        }
    })
}

/**
 * get owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOwner(uid, data, id) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from users where userID = ?'
        
        db.query(query, [ id, data.buildingID],   (error, rows, fields) => {
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
 * update Owner only owner table
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateOwner_info(id, data, files) {
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
                    let query = `Update ` + table.USERS + ` set type = ?, owner_role = ?, firstname = ?, lastname = ?, owner_company_name = ?, email = ?, address = ?, phone = ?, photo_url = ?, identity_card_front = ?, identity_card_back = ?, updated_at = ? where userID = ? `
                    db.query(query, [data.type, data.owner_role, data.firstname, data.lastname, data.owner_company_name, data.email, data.address, data.phone, photo_url, id_front, id_back, timeHelper.getCurrentTime(), id], async function (error, result, fields) {
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
 * delete apartments related to the owner
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

/**
 * delete owner
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteOwner(uid, id) {
    return new Promise((resolve, reject) => {
        let query = 'Delete from ' + table.USERS + ' where userID = ?'
  
        db.query(query, [ id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
  }
module.exports = ownerModel

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
function createOwner(uid, data) {
    return new Promise((resolve, reject) => {
        let confirm_query = `Select * from ` + table.USERS + ` where email = ?`;
        let query = `Insert into ` + table.USERS + ` ()
                  (select count(*) from ` + table.APARTMENTS + ` a left join ` + table.VOTE_AMOUNT_OF_PARTS + ` va on va.apartmentID = a.apartmentID where a.userID = o.userID) as apartment_count
                  from ` + table.USERS + ` o
                  where o.firstname like ? and o.usertype = "owner" and o.permission = "active" and o.status = "active"`
        db.query(confirm_query, [ data.email ],  async function (error, rows, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    let password = bcrypt.hashSync("123456")
                    let query = `Insert into ` + table.USERS + ` (usertype, type, owner_role, firstname, lastname, owner_company_name, password, address, phone, photo_url, identity_card_front, identity_card_back, status, permission, created_by, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, ["owner", data.type, data.owner_role, data.firstname, data.lastname, data.owner_company_name, password, data.address, data.phone, data.photo_url, data.identity_card_front, data.identity_card_back, "active", "active", uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        }
                    }))
                }
                db.query(query, [],  async (error, rows, fields) => {
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

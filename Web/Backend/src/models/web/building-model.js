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

var adminModel = {
    getCompanyListByUser: getCompanyListByUser,
    getBuildingList: getBuildingList,
    getCountBuildingList: getCountBuildingList,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompanyListByUser(uid) {
    return new Promise((resolve, reject) => {
        let query = `select c.*
                    from ` + table.COMPANIES + ` c
                    left join ` + table.USERS + ` u on c.companyID in (select companyID from ` + table.USERS + ` where userID = u.userID and permission = "active")
                    where c.permission = "active" and u.userID = ?`

        db.query(query, [ uid ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}

/**
 * get building list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingList(data) {
    return new Promise((resolve, reject) => {
        let query;
        if (data.companyID == -1) {
            query = `select b.*, 0 as total
                from ` + table.BUILDINGS + ` b
                left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                left join ` + table.USERS + ` u on c.companyID in (select companyID from ` + table.USERS + ` where userID = u.userID and permission = "active")
                where (b.name like ?) and b.permission = "active"`
        } else {
            query = `select b.*, 0 as total
                from ` + table.BUILDINGS + ` b
                left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                left join ` + table.USERS + ` u on c.companyID in (select companyID from ` + table.USERS + ` where userID = u.userID and permission = "active")
                where (b.name like ?) and b.permission = "active" and b.companyID = ?`
        }

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by b.buildingID desc';
        else {
            if (sort_column === 0)
                query += ' order by b.name ';
            else if (sort_column === 1)
                query += ' order by b.address ';

            else if (sort_column === 2)
                query += ' ';
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, data.companyID == -1 ? [ search_key ]: [search_key, data.companyID], (error, rows, fields) => {
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
function getCountBuildingList(data) {
    return new Promise((resolve, reject) => {
        let query;
        if (data.companyID == -1) {
            query = `select count(b.buildingID) count
                from ` + table.BUILDINGS + ` b
                left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                left join ` + table.USERS + ` u on c.companyID in (select companyID from ` + table.USERS + ` where userID = u.userID and permission = "active")
                where (b.name like ?) and b.permission = "active"`
        } else {
            query = `select count(b.buildingID) count
                from ` + table.BUILDINGS + ` b
                left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                left join ` + table.USERS + ` u on c.companyID in (select companyID from ` + table.USERS + ` where userID = u.userID and permission = "active")
                where (b.name like ?) and b.permission = "active" and b.companyID = ?`
        }
        search_key = '%' + data.search_key + '%'

        db.query(query, data.companyID == -1 ? [ search_key ]: [search_key, data.companyID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}


/**
 * create building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createBuilding(uid, data) {
    return new Promise((resolve, reject) => {
        let query = 'Insert into ' + table.BUILDINGS + ' (companyID, name, address, account_holdername, account_address, account_IBAN) values (?, ?, ?, ?, ?, ?)'
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
 * get building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuilding(uid) {
    return new Promise((resolve, reject) => {
        let get_building_query = 'Select * from ' + table.BUILDINGS + ' where buildingID = ?'
        let vote_query = 'Select * from ' + table.BUILDING_VOTE_BRANCH + ' left join ' + table.VOTEBRANCH + ' Using (voteID) where buildingID = ?'
        db.query(get_building_query, [ uid ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                getCompanyListByUser(uid).then((result) => {
                    db.query(vote_query, [uid], (error, rows1, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR});
                        } else {
                            resolve({building: rows, companyList: result, votelist: rows1})
                        }
                    })

                })
            }
        })
    })
}

/**
 * update building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateBuilding(id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.BUILDINGS + ' SET companyID = ?, name = ?, address = ?, account_holdername = ?, account_address = ?, account_IBAN = ? WHERE buildingID = ?'
        let delete_building_vote_branch = 'Delete from ' + table.BUILDING_VOTE_BRANCH + ' where buildingID = ?'
        db.query(query, [ data.companyID, data.name, data.address, data.account_holdername, data.account_address, data.account_IBAN, id ],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                let select_vote_query = 'Select * from ' + table.BUILDING_VOTE_BRANCH + ' where buildingID = ?'
                db.query(select_vote_query, [id], async (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR });
                    } else {
                        let delete_vote_query = 'Delete from ' + table.VOTEBRANCH + ' where voteID = ?'
                        for (let i in rows) {
                            db.query(delete_vote_query, [ rows[i].voteID ], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                }
                            })
                        }
                        db.query(delete_building_vote_branch, [id], async (error, rows, fields) => {
                            if (error) {
                                reject({ message: message.INTERNAL_SERVER_ERROR })
                            } else {
                                for (let i in data.vote) {
                                    let query = 'Insert into ' + table.VOTEBRANCH + ' (name) values (?)'
                                    let select_query = 'Select * from ' + table.VOTEBRANCH + ' where name = ?'
                                    let insert_query = 'Insert into ' + table.BUILDING_VOTE_BRANCH + ' (buildingID, voteID) values (?, ?)'
                                    let delete_query = 'Delete from ' + table.BUILDING_VOTE_BRANCH + ' where buildingID = ?'
                                    await db.query(query, [ data.vote[i].name ], async (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        } else {
                                            await db.query(select_query, [ data.vote[i].name ], (error, rows, fields) => {
                                                if (error) {
                                                    reject({ message: message.INTERNAL_SERVER_ERROR})
                                                } else {
                                                    db.query(insert_query, [ id, rows[rows.length - 1].voteID ], (error, rows, fields) => {
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
                    }
                })
                resolve("ok");
            }
        })
    })
}
module.exports = adminModel

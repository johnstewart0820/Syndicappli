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
var timeHelper = require('../../../helper/timeHelper')

var buildingModel = {
    getCompanyListByUser: getCompanyListByUser,
    getBuildingListByCompany: getBuildingListByCompany,
    getBuildingList: getBuildingList,
    getCountBuildingList: getCountBuildingList,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
    deleteBuilding: deleteBuilding,
    deleteAllBuilding: deleteAllBuilding
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
                    where c.permission = 'active' and c.companyID in (select relationID from ` + table.USER_RELATIONSHIP + ` where type = 'company' and userID = ?)`

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
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingListByCompany(uid, data) {
    return new Promise((resolve, reject) => {
        let query = ``
        if(data.companyID == -1){
            query = `select b.* from ` + table.BUILDINGS + ` b left join ` + table.COMPANIES + ` c on c.companyID = b.companyID where c.permission = 'active' and b.permission = 'active' and b.companyID in (select relationID from ` + table.USER_RELATIONSHIP + ` where userID = ? and type = 'company')`
        } else {
            query = `select b.* from ` + table.BUILDINGS + ` b left join ` + table.COMPANIES + ` c on c.companyID = b.companyID where c.permission = 'active' and b.permission = 'active' and b.companyID = ?`
        }

        db.query(query, [ data.companyID == -1 ? uid : data.companyID ], (error, rows, fields) => {
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
function getBuildingList(uid, data) {
    return new Promise((resolve, reject) => {
        let query;

        if (data.companyID == -1) {
            query = `select b.*, 0 as total, b.buildingID as ID
                    from ` + table.BUILDINGS + ` b
                    left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                    where c.permission = 'active' 
                    and b.companyID in (select relationID from ` + table.USER_RELATIONSHIP + ` where userID = ? and type = 'company') 
                    and b.permission = ? and (b.name like ?)`
        } else {
            query = `select b.*, 0 as total, b.buildingID as ID
                    from ` + table.BUILDINGS + ` b
                    left join ` + table.COMPANIES + ` c on c.companyID = b.companyID
                    where c.permission = 'active'
                    and b.permission = ? and (b.name like ?)
                    and b.companyID = ?`
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
        db.query(query, data.companyID == -1 ? [uid, data.status, search_key]: [ data.status, search_key, data.companyID], (error, rows, fields) => {
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
function getCountBuildingList(uid, data) {
    return new Promise((resolve, reject) => {
        let query;
        if (data.companyID == -1) {
            query = `select count(*) as count
                    from ` + table.BUILDINGS + ` b
                    left join ` + table.COMPANIES + ` c on c.companyID = b.companyID and c.permission = 'active'
                    left join ` + table.USER_RELATIONSHIP + ` ur on ur.relationID = c.companyID and ur.type = 'company'
                    left join ` + table.USERS + ` u on u.userID = ur.userID and u.permission = 'active'
                    where u.userID = ? and b.permission = ? and (b.name like ?)`
        } else {
            query = `select count(*) as count
                    from ` + table.BUILDINGS + ` b
                    left join ` + table.COMPANIES + ` c on c.companyID = b.companyID and c.permission = 'active'
                    left join ` + table.USER_RELATIONSHIP + ` ur on ur.relationID = c.companyID and ur.type = 'company'
                    left join ` + table.USERS + ` u on u.userID = ur.userID and u.permission = 'active'
                    where u.userID = ? and b.permission = ? and (b.name like ?) and b.companyID = ?`
        }
        search_key = '%' + data.search_key + '%'

        db.query(query, data.companyID == -1 ? [ uid, data.status, search_key ]: [ uid, data.status, search_key, data.companyID ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0)
                    resolve(0);
                else
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
        let query = 'Insert into ' + table.BUILDINGS + ' (companyID, name, address, created_by, created_at, updated_at) values (?, ?, ?, ?, ?, ?)'
        let select_building_query = 'Select * from ' + table.BUILDINGS + ' order by created_at desc limit 1'
        db.query(query, [data.companyID, data.name, data.address, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields) => {
            if (error) {
                reject({message: message.INTERNAL_SERVER_ERROR})
            } else {
                db.query(select_building_query, [], (error, rows, fields) => {
                    if (error) {
                        reject({message: message.INTERNAL_SERVER_ERROR});
                    } else {
                        if (rows.length > 0) {
                            let buildingID = rows[0].buildingID
                            query = 'Insert into ' + table.VOTE_BUILDING_BRANCH + ' (buildingID, vote_branch_name, description, created_by, created_at, updated_at) values ?'
                            let user_relation_query = 'Insert into ' + table.USER_RELATIONSHIP + ' (userID, type, relationID) values (?, ?, ?)'
                            let vote_branches = []
                            let item
                            for (var i = 0; i < data.vote_branches.length; i++) {
                                item = data.vote_branches[i]
                                vote_branches.push([buildingID, item.name, item.description, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()])
                            }
                            db.query(query, [vote_branches], (error, rows, fields) => {
                                if (error) {
                                    reject({message: message.INTERNAL_SERVER_ERROR});
                                } else {
                                    db.query(user_relation_query, [uid, "building", buildingID], (error, rows, fields) => {
                                        if (error) {
                                            reject({message: message.INTERNAL_SERVER_ERROR});
                                        } else {
                                            resolve("OK")
                                        }
                                    })
                                }
                            })
                        } else {
                            reject({message: message.BUILDING_NOT_EXSIT});
                        }
                    }
                })
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
        let branch_info_query = 'Select * from ' + table.VOTE_BUILDING_BRANCH + ' left join ' + table.BUILDINGS + ' Using (buildingID) where buildingID = ?'
        db.query(get_building_query, [ uid ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                db.query(branch_info_query, [uid], (error, rows1, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR});
                    } else {
                        let query = 'select sum(v.amount) as total, v.voteID from vote_amount_of_parts v group by v.voteID'
                        db.query(query, [], (error, result, fields) => {
                            if (error) {
                                reject({ message: message.INTERNAL_SERVER_ERROR })
                            } else {
                                for (var i in result) {
                                    for (var j in rows1) {
                                        rows1[j].total = 0
                                        if (result[i].voteID === rows1[j].voteID)
                                            rows1[j].total = result[i].total
                                    }
                                }
                                resolve({building: rows, votelist: rows1})
                            }
                        })
                        
                    }
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
function updateBuilding(uid, id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.BUILDINGS + ' SET companyID = ?, name = ?, address = ?, updated_by = ?, updated_at = ? WHERE buildingID = ?'
        db.query(query, [ data.companyID, data.name, data.address, uid, timeHelper.getCurrentTime(), id ],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                let delete_vote_query = 'Delete from ' + table.VOTE_BUILDING_BRANCH + ' where buildingID = ?'
                query = 'Insert into ' + table.VOTE_BUILDING_BRANCH + ' (buildingID, vote_branch_name, description, created_by, created_at, updated_at) values ?'
                db.query(delete_vote_query, [id],  (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        let vote_branches = []
                        let item
                        for ( var i = 0 ; i < data.vote_branches.length ; i++){
                            item = data.vote_branches[i]
                            vote_branches.push([id, item.vote_branch_name, item.description, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()])
                        }
                        db.query(query, [vote_branches],  (error, rows, fields) => {
                            if (error) {
                                reject({ message: message.INTERNAL_SERVER_ERROR });
                            } else {
                                resolve("OK")
                            }
                        })
                    }
                })
            }
        })
    })
}

/**
 * delete building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteBuilding(uid, id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.BUILDINGS + ' SET permission = ?, deleted_at = ? WHERE buildingID = ?'
        db.query(query, [ data.status, timeHelper.getCurrentTime(), id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                let delete_apartment_query = 'UPDATE ' + table.APARTMENTS + ' SET permission = ? WHERE buildingID = ?'
                db.query(delete_apartment_query, [ data.status, id ], (error, rows, fields) => {
                  if(error){
                      reject({ message: message.INTERNAL_SERVER_ERROR })
                  } else {
                      resolve("OK")
                  }
                })
            }
        })
    })
}

/**
 * delete trased all building
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteAllBuilding(data) {
    return new Promise((resolve, reject) => {
        let buildings = data.list
        for (let i in buildings) {
            let query = 'Delete from ' + table.BUILDINGS + ' where buildingID = ?'
            db.query(query, [buildings[i]], async (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR})
                } else {
                    let query = 'Select * from ' + table.APARTMENTS + ' where buildingID = ?'
                    await db.query(query, [buildings[i]], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR})
                        } else {
                            let apartments = rows
                            let query = 'Delete from ' + table.APARTMENTS + ' where buildingID = ?'
                            db.query(query, [buildings[i]], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR})
                                } else {
                                    for (let k in apartments) {
                                        let query = 'Select * from ' + table.VOTE_AMOUNT_OF_PARTS + ' where apartmentID = ?'
                                        db.query(query, [apartments[k].apartmentID], (error, rows, fields) => {
                                            if (error) {
                                                reject({ message: message.INTERNAL_SERVER_ERROR})
                                            } else {
                                                let votes = rows
                                                let query = 'Delete from ' + table.VOTE_AMOUNT_OF_PARTS + ' where apartmentID = ?'
                                                db.query(query, [apartments[k].apartmentID], (error, rows, fields) => {
                                                    if (error) {
                                                        reject({ message: message.INTERNAL_SERVER_ERROR })
                                                    } else {
                                                        let query = 'Delete from ' + table.VOTE_BUILDING_BRANCH + ' where voteID = ?'
                                                        for (let l in votes) {
                                                            db.query(query, [votes[l].voteID], (error, rows, fields) => {
                                                                if (error) {
                                                                    reject({ message: message.INTERNAL_SERVER_ERROR})
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
                    })
                    let relation_query = 'Delete from ' + table.USER_RELATIONSHIP + ' where relationID = ?'
                    await db.query(relation_query, [buildings[i]], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR})
                        }
                    })
                }
            })
        }
        resolve("OK")
    })
}



module.exports = buildingModel

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

var adminModel = {
    getProfile: getProfile,
    updateProfile: updateProfile,
    getUserList: getUserList,
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getCompanyList: getCompanyList,
    getCompanyListByUser: getCompanyListByUser,
    getCompanyBuildingListByUser: getCompanyBuildingListByUser,
    getAllCompanyList: getAllCompanyList,
    getBuildingList: getBuildingList,
    getBuildingListByCompany: getBuildingListByCompany,
    getBuildingListByUser: getBuildingListByUser,
    createBuilding: createBuilding,
    getBuilding: getBuilding,
    updateBuilding: updateBuilding,
}

/**
 * get profile data for user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getProfile(uid) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.USERS + ' WHERE userID = ? and permission = "active"'
        let query_role = 'SELECT r.* FROM user_role ur LEFT JOIN role r ON ur.roleID=r.roleID WHERE ur.userID=?'

        db.query(query, [ uid ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                db.query(query_role, [ uid ], (error, rows_role, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        let response = rows[0]
                        for (var i = 0 ; i < rows_role.length ; i++ ) {
                            response[rows_role[i].role_name] = rows_role[i].permission
                        }
                        resolve(response)
                    }
                })
            }
        })
    })
}

/**
 * update profile data for user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProfile(uid, data, files) {
    return new Promise(async function(resolve, reject) {
        var file_name = ""
        if(files.avatar){
            uploadS3 = await s3Helper.uploadS3(files, s3buckets.AVATAR)
            file_name = uploadS3.Location
        }

        if (data.new_password === "" || data.new_password === undefined) {
            if (file_name === "") {
                let query = 'UPDATE ' + table.USERS + ' SET lastname = ?, firstname = ?, email = ?, phone = ? WHERE userID = ?'
                db.query(query, [ data.lastname, data.firstname, data.email, data.phone, uid], (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        resolve(uid)
                    }
                })
            } else {
                let query = 'UPDATE ' + table.USERS + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, photo_url = ? WHERE userID = ?'
                db.query(query, [ data.lastname, data.firstname, data.email, data.phone, file_name, uid], (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        resolve(uid)
                    }
                })
            }
        } else {
            getProfile(uid).then((profile) => {
                if (profile) {
                    let hash_database_old_password = profile.password
                    let hash_new_password = bcrypt.hashSync(data.new_password)
                    bcrypt.compare(data.old_password, hash_database_old_password, function(error, result) {
                        if (error) {
                            reject({ message: message.INVALID_PASSWORD })
                        } else {
                            if (result) {
                                if (file_name === "") {
                                    let query = 'UPDATE ' + table.USERS + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, password = ? WHERE userID = ?'
                                    db.query(query, [ data.lastname, data.firstname, data.email, data.phone, hash_new_password, uid ], (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        } else {
                                            resolve(profile)
                                        }
                                    })
                                } else {
                                    let query = 'UPDATE ' + table.USERS + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, password = ?, photo_url = ? WHERE userID = ?'
                                    db.query(query, [ data.lastname, data.firstname, data.email, data.phone, hash_new_password, file_name, uid ], (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        } else {
                                            resolve(profile)
                                        }
                                    })
                                }
                            } else {
                                reject({ message: message.INVALID_PASSWORD })
                            }
                        }
                    })
                } else {
                    reject({ message: message.INTERNAL_SERVER_ERROR})
                }
            })
        }
    })
}

/**
 * get building list by user and company data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingListByUser(uid) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from ' + table.ADMIN_COMPANY + ' left join ' + table.BUILDINGS + ' using(companyID) where adminID = ?';

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
 * get user list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getUserList(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.USERS + ' WHERE (lastname like ? or firstname like ?) and permission = "active"'
        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by userID desc';
        else {
            if (sort_column === 0)
                query += ' order by lastname ';
            else if (sort_column === 1)
                query += ' order by firstname ';
            else if (sort_column === 2)
                query += ' order by email ';
            else if (sort_column === 3)
                query += ' order by phone ';

            query += data.sort_method;
        }
        if (row_count !== -1) {
            query += ' limit ' + page_num * row_count + ',' + row_count
        }
        db.query(query, [ search_key, search_key ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                getCountUserList(data).then((data) => {
                    resolve({rows: rows, count: data});
                })

            }
        })
    })
}

/**
 * get count for user list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountUserList(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT count(*) count FROM ' + table.USERS + ' WHERE (lastname like ? or firstname like ?) and permission = "active"'
        search_key = '%' + data.search_key + '%'

        db.query(query, [ search_key, search_key ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}

/**
 * create user data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object company
 * @return  object If success returns object else returns message
 */
function createUser(data, file_name) {
    return new Promise((resolve, reject) => {
        let password = bcrypt.hashSync("123456")
        let query = 'Insert into ' + table.ADMIN + ' (lastname, firstname, email, phone, photo_url, password, role_companies, role_managers, role_buildings, role_owners, role_orders, role_products, role_discountcodes, role_admins) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

        db.query(query, [ data.lastname, data.firstname, data.email, data.phone, file_name, password, data.role_companies, data.role_managers, data.role_buildings, data.role_owners, data.role_orders, data.role_products, data.role_discountcodes, data.role_admins], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                console.log (data.companyID);

                resolve("ok");
            }
        })
    })
}

/**
 * get user data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getUser(uid) {
    return new Promise((resolve, reject) => {
        getProfile(uid).then((profile) => {
            let query = 'SELECT buildingID, building_name FROM ' + table.USER + ' Left Join ' + table.BUILDING_MANAGER + ' USING (adminID) Left Join ' + table.BUILDING + ' USING (buildingID) '
                + 'WHERE adminID = ? and ' + table.BUILDING + '.permission = "true"'
            db.query(query, [ uid ], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    getBuildingListByCompany(profile.companyID).then((buildings) => {
                        for (let i = 0; i < buildings.length; i ++) {
                            buildings[i].selected = false;
                        }
                        for (let i = 0; i < buildings.length; i ++) {
                            for (let j = 0; j < rows.length; j ++) {
                                if (buildings[i].buildingID === rows[j].buildingID)
                                    buildings[i].selected = true;
                            }
                        }
                        resolve({profile: profile, buildings: buildings})
                    })
                }
            })
        })
    })
}

/**
 * update user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateUser(id, data) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.USER + ' SET  (lastname = ?, firstname = ?, email = ?, phone = ?) and permission = "true"'
        search_key = '%' + data.search_key + '%'

        db.query(query, [ search_key, search_key, search_key, search_key ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}

/**
 * delete user
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.USER + ' SET  permission = "false" where userID = ?'

        db.query(query, [ id ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(id)
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
function getCompanyList(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.COMPANIES + ' WHERE (name like ?) and permission not like "deleted"'
        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);

        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by companyID desc';
        else {
            if (sort_column === 0)
                query += ' order by name ';
            else if (sort_column === 1)
                query += ' order by address ';
            else if (sort_column === 2)
                query += ' order by email ';
            else if (sort_column === 3)
                query += ' order by phone ';
            // else if (sort_column === 4)
            //   query += ' order by company_manager_count ';
            // else if (sort_column === 5)
            //   query += ' order by company_member_count ';

            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, [ search_key ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                getCountCompanyList(data).then((data) => {
                    if (data) {
                        resolve({rows: rows, count: data});
                    } else {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    }
                })

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
function getCompanyListByUser(uid) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.ADMIN_COMPANY + ' Left Join ' + table.COMPANIES + ' using(companyID) WHERE adminID = ?'

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
function getCompanyBuildingListByUser(uid) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.ADMIN_COMPANY + ' Left Join ' + table.COMPANIES + ' using(companyID) Left join ' + table.BUILDINGS + ' using(companyID) WHERE adminID = ?'

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
 * get all company list
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getAllCompanyList(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.COMPANIES + ' WHERE permission = "true"'

        db.query(query, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows);
            }
        })
    })
}



/**
 * get count for company list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountCompanyList(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT count(*) count FROM ' + table.COMPANIES + ' WHERE (name like ?) and permission not like "deleted"'
        search_key = '%' + data.search_key + '%'

        db.query(query, [ search_key ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
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
            query = 'SELECT * FROM ' + table.BUILDINGS + ' WHERE (name like ?) and permission not like "deleted"'
        } else {
            query = 'SELECT * FROM ' + table.BUILDINGS + ' WHERE (name like ?) and companyID = ? and permission not like "deleted"'
        }

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by buildingID desc';
        else {
            if (sort_column === 0)
                query += ' order by name ';
            else if (sort_column === 1)
                query += ' order by address ';

            else if (sort_column === 2)
                query += ' ';
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, data.companyID == -1 ? [ search_key ]: [search_key, data.companyID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                getCountBuildingList(data).then((data) => {
                    getCompanyListByUser(uid).then((result) => {
                        resolve({rows: rows, count: data, company_list: result});
                    }).catch((err) => {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    })

                })

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
            query = 'SELECT count(*) count FROM ' + table.BUILDINGS + ' WHERE (name like ?) and permission not like "deleted"'
        } else {
            query = 'SELECT count(*) count FROM ' + table.BUILDINGS + ' WHERE (name like ?) and companyID = ? and permission not like "deleted"'
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
 * get count for building list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingListByCompany(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.BUILDING + ' WHERE companyID = ? and permission = "true"'

        db.query(query, [ data ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows)
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
function createBuilding(data) {
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

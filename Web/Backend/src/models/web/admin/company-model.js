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

var companyModel = {
    getCompanyList: getCompanyList,
    getCountCompanyList: getCountCompanyList,
    createCompany: createCompany,
    updateCompany: updateCompany,
    getCompany: getCompany,
    deleteCompany: deleteCompany,
    deleteAllCompany: deleteAllCompany
}


/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompanyList(uid, data) {
    return new Promise((resolve, reject) => {

        let query = `select c.*, c.companyID as ID, 
                    (select count(t.id) from (SELECT m.userID as id FROM users m LEFT JOIN user_relationship usr ON usr.userID = m.userID LEFT JOIN buildings ON usr.relationID = buildings.buildingID  WHERE m.usertype = 'manager'  AND m.permission ='active' AND buildings.companyID = c.companyID AND usr.type = 'building' GROUP BY m.userID ) as t) as manager_count,
                    concat((select firstname from ` + table.USERS + ` m left join ` + table.USER_RELATIONSHIP + ` usr on usr.userID = m.userID and usr.type = 'company' where m.usertype = 'manager' and m.permission = 'active' and usr.relationID = c.companyID order by m.userID asc limit 1), " ", (select lastname from ` + table.USERS + ` m left join ` + table.USER_RELATIONSHIP + ` usr on usr.userID = m.userID and usr.type = 'company' where m.usertype = 'manager' and m.permission = 'active' and usr.relationID = c.companyID order by m.userID asc limit 1)) as contact_name,
                    (select count(a.apartmentID) from ` + table.APARTMENTS + ` a left join ` + table.BUILDINGS + ` b on b.buildingID = a.buildingID left join ` + table.COMPANIES + ` com on com.companyID = b.companyID where a.permission = 'active' and b.permission = 'active' and com.permission = 'active' and com.companyID = c.companyID) as apartment_count
                    from ` + table.COMPANIES + ` c
                    left join ` + table.USER_RELATIONSHIP + ` ur on ur.relationID = c.companyID and ur.type = 'company'
                    left join ` + table.USERS + ` u on u.userID = ur.userID 
                    where c.permission = ? and u.userID = ? and (c.name like ?) and u.permission = 'active'`
        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by c.companyID desc';
        else {
            if (sort_column === 0)
                query += ' order by c.name ';
            else if (sort_column === 1)
                query += ' order by contact_name ';
            else if (sort_column === 2)
                query += ' order by c.email ';
            else if (sort_column === 3)
                query += ' order by c.phone ';
            else if (sort_column === 4)
                query += ' order by manager_count ';
            else if (sort_column === 5)
                query += ' order by apartment_count ';
            else if (sort_column === 6)
                query += ' order by c.status ';
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, [ data.status, uid, search_key ], (error, rows, fields) => {
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
function getCountCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select count(*) as cnt
                    from ` + table.COMPANIES + ` c
                    left join ` + table.USER_RELATIONSHIP + ` ur on ur.relationID = c.companyID and ur.type = 'company'
                    left join ` + table.USERS + ` u on u.userID = ur.userID 
                    where c.permission = ? and u.userID = ? and (c.name like ?) and u.permission = 'active'`
        search_key = '%' + data.search_key + '%'

        db.query(query, [data.status, uid, search_key], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].cnt)
            }
        })
    })
}

/**
 * create company data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createCompany(uid, data, file) {
    return new Promise((resolve, reject) => {
        let confirm_query = 'Select * from ' + table.COMPANIES + ' where email = ?';
        let query = 'Insert into ' + table.COMPANIES + ' (name, address, email, phone, SIRET, VAT, account_holdername, account_address, account_IBAN, logo_url, access_360cam, access_webcam, access_audio, status, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        db.query(confirm_query, [data.email], async function (error, rows, fields) {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0)
                    reject({ message: message.COMPANY_ALREADY_EXIST })
                else {
                    var file_name = ""
                    if(file){
                        uploadS3 = await s3Helper.uploadLogoS3(file, s3buckets.COMPANY_LOGO)
                        file_name = uploadS3.Location
                    }
                    db.query(query, [ data.name, data.address, data.email, data.phone, data.SIRET, data.VAT, data.account_holdername, data.account_address, data.account_IBAN, file_name, data.access_360cam, data.access_webcam, data.access_audio, data.status, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            let getLastCompanyIdQuery = 'Select * from ' + table.COMPANIES + ' where email = ?'
                            db.query(getLastCompanyIdQuery, [data.email], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    let companyID = rows[0].companyID;
                                    let user_relation_query = 'Insert into ' + table.USER_RELATIONSHIP + ' (userID, type, relationID) VALUES (?, ?, ?)'
                                    db.query(user_relation_query, [uid, "company", companyID], (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        } else {
                                            resolve("ok")
                                        }
                                    })
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
 * update Company
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateCompany(companyID, uid, data, file) {
    return new Promise((resolve, reject) => {
        let confirm_query = 'Select * from ' + table.COMPANIES + ' where email = ? and companyID != ?';
        
        db.query(confirm_query, [data.email, companyID], async function (error, rows, fields) {
            if(error) {
                reject({message: message.INTERNAL_SERVER_ERROR})
            } else {
                if(rows.length > 0){
                    reject({ message: message.COMPANY_ALREADY_EXIST })
                } else {
                    var file_name = ""
                    if(file){
                        uploadS3 = await s3Helper.uploadLogoS3(file, s3buckets.COMPANY_LOGO)
                        file_name = uploadS3.Location
                    }
                    let query
                    let params = []
                    if (file_name == "") {
                        query = 'UPDATE ' + table.COMPANIES + ' SET name = ?, address = ?, email = ?, phone = ?, SIRET = ?, VAT = ?, account_holdername = ?, account_address = ?, account_IBAN = ?, access_360cam = ?, access_webcam = ?, access_audio = ?, status = ?, updated_by = ?, updated_at = ? WHERE companyID = ?'
                        params = [data.name, data.address, data.email, data.phone, data.SIRET, data.VAT, data.account_holdername, data.account_address, data.account_IBAN, data.access_360cam, data.access_webcam, data.access_audio, data.status, uid, timeHelper.getCurrentTime(), companyID]
                    } else {
                        query = 'UPDATE ' + table.COMPANIES + ' SET name = ?, address = ?, email = ?, phone = ?, SIRET = ?, VAT = ?, account_holdername = ?, account_address = ?, account_IBAN = ?, logo_url = ?, access_360cam = ?, access_webcam = ?, access_audio = ?, status = ?, updated_by = ?, updated_at = ? WHERE companyID = ?'
                        params = [data.name, data.address, data.email, data.phone, data.SIRET, data.VAT, data.account_holdername, data.account_address, data.account_IBAN, file_name, data.access_360cam, data.access_webcam, data.access_audio, data.status, uid, timeHelper.getCurrentTime(), companyID]
                    }
                    db.query(query, params, (error, rows, fields) => {
                        if (error) {
                            reject({message: message.INTERNAL_SERVER_ERROR})
                        } else {
                            resolve("OK")
                        }
                    })
                }
            }
        })
    })
}

/**
 * get company data by id
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompany(uid, companyID) {
    return new Promise((resolve, reject) => {
        let query = `select c.*, 
                    (select count(m.userID) from ` + table.USERS + ` m left join ` + table.USER_RELATIONSHIP + ` usr on usr.userID = m.userID and usr.type = 'building' left join buildings on usr.relationID = buildings.buildingID and buildings.permission="active" where m.usertype = 'manager' and m.permission = 'active' and buildings.companyID = c.companyID) as manager_count,
                    (select count(a.apartmentID) from ` + table.APARTMENTS + ` a left join ` + table.BUILDINGS + ` b on b.buildingID = a.buildingID and b.permission = 'active' left join ` + table.COMPANIES + ` com on com.companyID = b.companyID and com.permission = 'active' where a.permission = 'active' and com.companyID = c.companyID) as apartment_count
                    from ` + table.COMPANIES + ` c
                    where c.companyID = ? and c.permission = "active"`
        db.query(query, [companyID], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if(rows.length > 0){
                    resolve(rows[0])
                } else {
                    reject({ message: message.COMPANY_NOT_EXIST })
                }
            }
        })
    })
}


function deleteCompany(uid, id, data){
    return new Promise((resolve, reject) => {
        let query = 'UPDATE ' + table.COMPANIES + ' SET permission = ?, deleted_at = ? WHERE companyID = ?'
        db.query(query, [ data.status, timeHelper.getCurrentTime(), id ], async (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                let get_buildings_by_company = `Select * from ` + table.BUILDINGS + ` where companyID = ?`
                let get_managers_by_building = `Select * from ` + table.USER_RELATIONSHIP + ` where type = 'building' and relationID = ?`
                let manager_delete_query = 'UPDATE ' + table.USERS + ' SET permission = ?, deleted_at = ? WHERE userID = ? and usertype = "manager"'
                await db.query(get_buildings_by_company, [ id ], async (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } else {
                        if(rows.length > 0){
                            for (var i = 0 ; i < rows.length ; i++){
                                await db.query(get_managers_by_building, [ rows[i].buildingID ], async (error1, rows1, fields) => {
                                    if (error1) {
                                        reject({ message: message.INTERNAL_SERVER_ERROR })
                                    } else {
                                        if(rows1.length > 0) {
                                            for (var j = 0 ; j < rows1.length ; j++) {
                                                await db.query(manager_delete_query, [data.status, timeHelper.getCurrentTime(), rows1[j].userID])
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                })

                let building_delete_query = 'UPDATE ' + table.BUILDINGS + ' SET permission = ?, deleted_at = ? WHERE companyID = ?'
                await db.query(building_delete_query, [ data.status, timeHelper.getCurrentTime(), id ], (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    }
                })
                resolve("Ok")
            }
        })
    })
}

/**
 * delete trased all company
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteAllCompany(data) {
    return new Promise(async (resolve, reject) => {
        let companies =  data.list
        for (let i in companies) {
            let query = 'Delete from ' + table.COMPANIES + ' where companyID = ?'
            await db.query(query, [companies[i]], async (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR})
                } else {
                    let query = 'Select * from ' + table.BUILDINGS + ' where companyID = ?'
                    await db.query(query, [companies[i]],  (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR})
                        } else {
                            let buildings = rows
                            let query = 'Delete from ' + table.BUILDINGS + ' where companyID = ?'
                            db.query(query, [companies[i]], async (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR})
                                } else {
                                    for (let j in buildings) {
                                        let query = 'Select * from ' + table.APARTMENTS + ' where buildingID = ?'
                                        await db.query(query, [buildings[j].buildingID], (error, rows, fields) => {
                                            if (error) {
                                                reject({ message: message.INTERNAL_SERVER_ERROR})
                                            } else {
                                                let apartments = rows
                                                let query = 'Delete from ' + table.APARTMENTS + ' where buildingID = ?'
                                                db.query(query, [buildings[j].buildingID], (error, rows, fields) => {
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
                                        let relation_query = 'Delete from ' + table.USER_RELATIONSHIP + ' where relationID = ? and type = "building"'
                                        await db.query(relation_query, [buildings[j].buildingID], (error, rows, fields) => {
                                            if (error) {
                                                reject({ message: message.INTERNAL_SERVER_ERROR})
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    let relation_query = 'Delete from ' + table.USER_RELATIONSHIP + ' where relationID = ? and type = "company"'
                    await db.query(relation_query, [companies[i]], (error, rows, fields) => {
                        if (error)
                            reject({ message: message.INTERNAL_SERVER_ERROR})
                    })
                    
                }
            }) 
        }
        resolve("OK")
    })
}


module.exports = companyModel

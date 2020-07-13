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

var companyModel = {
    getCompanyList: getCompanyList,
    getCountCompanyList: getCountCompanyList,
    createCompany: createCompany,
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
                    (select count(*) from users where companyID = c.companyID and usertype = "manager") as manager_count,
                    (select firstname from users where companyID = c.companyID and usertype = "manager" ORDER BY userID asc LIMIT 1) as manager_firstname,
                    (select lastname from users where companyID = c.companyID and usertype = "manager" ORDER BY userID asc LIMIT 1) as manager_lastname,
                    concat((select lastname from users where companyID = c.companyID and usertype = "manager" ORDER BY userID asc LIMIT 1), " ",(select firstname from users where companyID = c.companyID and usertype = "manager" ORDER BY userID asc LIMIT 1)) as contact_name,
                    (select count(a.apartmentID) from apartments a left join users u on u.userID = a.userID and u.usertype = "owner" where u.companyID = c.companyID GROUP BY a.apartmentID) as apartment_count
                    from companies c
                    left join users us on c.companyID in (select userID from users where userID = us.userID)
                    where us.userID = ? and us.permission = "active" and us.status = "active"`
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
                query += ' order by manager_firstname ';
            else if (sort_column === 2)
                query += ' order by c.email ';
            else if (sort_column === 3)
                query += ' order by c.phone ';
            else if (sort_column === 4)
                query += ' order by c.manager_count ';
            else if (sort_column === 5)
                query += ' ';
            else if (sort_column === 6)
                query += ' order by c.status ';
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
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
 * get count for building list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select count(c.companyID) as cnt
                    from companies c
                    left join users us on c.companyID in (select userID from users where userID = us.userID)
                    where us.userID = ? and us.permission = "active" and us.status = "active"`
        // search_key = '%' + data.search_key + '%'

        db.query(query, [uid], (error, rows, fields) => {
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
function createCompany(uid, data, file_name) {
    return new Promise((resolve, reject) => {
        let confirm_query = 'Select * from ' + table.COMPANIES + ' where email = ?';
        let query = 'Insert into ' + table.COMPANIES + ' (name, address, email, phone, SIRET, VAT, account_holdername, account_address, account_IBAN, logo_url, access_360cam, access_webcam, access_audio, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        db.query(confirm_query, [data.email], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0)
                    reject({ message: message.COMPANY_ALREADY_EXIST })
                else {
                    db.query(query, [ data.name, data.address, data.email, data.phone, data.SIRET, data.VAT, data.account_holdername, data.account_address, data.account_IBAN, file_name, data.access_360cam, data.access_webcam, data.access_audio, data.status], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            let getLastCompanyIdQuery = 'Select * from ' + table.COMPANIES + ' where email = ?'
                            db.query(getLastCompanyIdQuery, [data.email], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    let companyID = rows[0].companyID;
                                    let query = 'Insert into ' + table.ADMIN_COMPANY + ' (adminID, companyID) VALUES (?, ?)'
                                    db.query(query, [uid, companyID], (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR })
                                        } else {
                                            resolve("ok");
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

module.exports = companyModel

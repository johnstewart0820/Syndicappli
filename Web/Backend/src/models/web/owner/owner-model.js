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

var ownerModel = {
    getOwnerList: getOwnerList,
    createOwner_info: createOwner_info,
    getOwner: getOwner,
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
                    let randomPassword = randtoken.generate(15);
                    let password = bcrypt.hashSync(randomPassword)
                    let query = `Insert into ` + table.USERS + ` (usertype, type, owner_role, firstname, lastname, owner_company_name, password, email, address, phone, status, invitation_status, permission, created_by, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, ["owner", data.type, "subaccount", data.firstname, data.lastname, data.owner_company_name, password, data.email, data.address, data.phone, "active", "invited", "active", uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            let query = `select * from users u left join user_relationship r on u.userID = r.userID and r.type="building" left join buildings b on r.relationID = b.buildingID where u.userID = ? and b.permission = "active" group by b.buildingID `
                            db.query(query, [uid], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR });
                                } else {
                                    let buildings = rows
                                    let query = `select * from users where email = ?`
                                    db.query(query, [data.email], async (error, rows, fields) => {
                                        if (error) {
                                            reject({ message: message.INTERNAL_SERVER_ERROR });
                                        } else {
                                            let saID = rows[0].userID
                                            for (let i in buildings) {
                                                let query = `Insert into user_relationship r (userID, type, relationID)`
                                                await db.query(query, [saID, "building", buildings[i].buildingID], (error, result, fields) => {
                                                    if (error) {
                                                        reject({ message: message.INTERNAL_SERVER_ERROR });
                                                    }
                                                })                                                 
                                            }
                                            sendMail(mail.TITLE_FORGOT_PASSWORD, data.email, mail.TYPE_FORGOT_PASSWORD, randomPassword)
                                            .then((response) => {
                                                resolve({ code: code.OK, message: message.EMAIL_RESET_LINK_SENT_SUCCESSFULLY, data: {}})
                                            })
                                            .catch((err) => {
                                                if(err.message.statusCode == code.BAD_REQUEST){
                                                    reject({ code: code.INTERNAL_SERVER_ERROR, message: message.EMIL_IS_NOT_EXIST, data: {} })
                                                } else {
                                                    reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
                                                }
                                            })
                                            resolve("ok")
                                        }
                                    })
                                }
                            })
                            
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
                let query = 'Delete from ' + table.USER_RELATIONSHIP + ' where userID = ?'
                db.query(query, [id], (error, rows, fields) => {
                    if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                    } 
                    else 
                        resolve("ok")
                })
            }
        })
    })
  }
module.exports = ownerModel

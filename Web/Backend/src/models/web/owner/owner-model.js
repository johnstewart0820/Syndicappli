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
    deleteOwner: deleteOwner,
    acceptInvitation: acceptInvitation,
    reinviteOwner: reinviteOwner
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
                    let randomToken = randtoken.generate(50);
                    let password = bcrypt.hashSync(randomPassword)
                    let query = `Insert into ` + table.USERS + ` (usertype, type, owner_role, firstname, lastname, password, email, phone, status, invitation_status, permission, created_by, created_at, updated_at, token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, ["owner", "Mr & Mrs", "subaccount", data.firstname, data.lastname, password, data.email, data.phone, "active", "invited", "active", uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime(), randomToken], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            let query = `select b.buildingID from users u left join user_relationship r on u.userID = r.userID and r.type="building" left join buildings b on r.relationID = b.buildingID where u.userID = ? and b.permission = "active" group by b.buildingID `
                            db.query(query, [uid], (error, rows, fields) => {
                                console.log('err: ', error)
                                console.log('rows: ', rows)
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
                                            if (buildings && buildings.length > 0) {
                                                for (let i in buildings) {
                                                    let query = `Insert into user_relationship (userID, type, relationID) values (?, ?, ?)`
                                                    await db.query(query, [saID, "building", buildings[i].buildingID], (error, result, fields) => {
                                                        if (error) {
                                                            reject({ message: message.INTERNAL_SERVER_ERROR });
                                                        }
                                                    })                                                 
                                                }
                                            }
                                            sendMail(mail.TITLE_SUBACCOUNT_INVITE, data.email, mail.TYPE_SUBACCOUNT_INVITE, randomPassword, randomToken)
                                            .then((response) => {
                                                resolve("OK")
                                            })
                                            .catch((err) => {
                                                if(err.message.statusCode == code.BAD_REQUEST){
                                                    reject({ message: message.EMIL_IS_NOT_EXIST })
                                                } else {
                                                    reject({ message: err.message })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            
                        }
                    })
                } else {
                    reject({ message: message.COMPANY_ALREADY_EXIST });
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
        
        db.query(query, [ id ],   (error, rows, fields) => {
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

  /**
 * Accept Invitation
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function acceptInvitation(token) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM ' + table.USERS + ' WHERE token = ?'
        db.query(query, [token], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if(rows.length > 0){
                    let update_query = 'UPDATE ' + table.USERS + ' SET invitation_status = ? WHERE token = ?'
                    db.query(update_query, ["accepted",token], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            resolve("OK")
                        }
                    })
                } else {
                    reject({ message: message.ACCOUNT_NOT_EXIST })
                }
            }
        })        
    })
  }

  /**
 * resend email
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function reinviteOwner(id) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from users where userID = ?'
        
        db.query(query, [ id ],   (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    let email = rows[0].email
                    let randomPassword = randtoken.generate(15);
                    let randomToken = randtoken.generate(50);
                    let password = bcrypt.hashSync(randomPassword)
                    let query = `Update ` + table.USERS + ` Set password = ?, updated_at = ?, token = ? where email = ?`
                    db.query(query, [password, timeHelper.getCurrentTime(), randomToken, email], function (error, rows, fields)  {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            sendMail(mail.TITLE_SUBACCOUNT_INVITE, email, mail.TYPE_SUBACCOUNT_INVITE, randomPassword, randomToken)
                            .then((response) => {
                                resolve("OK")
                            })
                            .catch((err) => {
                                if(err.message.statusCode == code.BAD_REQUEST){
                                    reject({ message: message.EMIL_IS_NOT_EXIST })
                                } else {
                                    reject({ message: err.message })
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}
module.exports = ownerModel

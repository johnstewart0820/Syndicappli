/**
 * Auth model file
 *
 * @package   backend/src/models
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var db = require('../../database/database')
var message  = require('../../constants/message')
var bcrypt = require('bcrypt-nodejs')
var table  = require('../../constants/table')

var companyModel = {
  getCompanyListByUser: getCompanyListByUser,
  getBuildingListByUser: getBuildingListByUser,
  getManagerList: getManagerList,
  getCountManagerList: getCountManagerList,
  createManager: createManager,
  getManager: getManager,
  updateManager: updateManager,
}

/**
 * get count for building list for search filter
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompanyListByUser(uid) {
  return new Promise((resolve, reject) => {
    let query = `select * from admin_company left join companies using (companyID)
    where adminID = ? and permission not like "deleted"`

    db.query(query, [uid], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        resolve(rows)
      }
    })
  })
}

/**
 * get count for building list for search filter
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingListByUser(uid) {
  return new Promise((resolve, reject) => {
    let query = `select * from (select * from admin_company left join companies using (companyID) where adminID = ? and permission not like "deleted" ) m
    left join (select * from buildings where permission not like "deleted") n using(companyID)`

    db.query(query, [uid], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        resolve(rows)
      }
    })
  })
}

/**
 * get company list with filter key
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getManagerList(uid, data) {
    return new Promise((resolve, reject) => {
      let query;
      if (data.companyID == -1) {
        if (data.buildingID == -1)
          query = 'Select * from managers left join admin_company using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and permission not like "deleted"'
        else
          query = 'Select * from managers left join admin_company using (companyID) left join buildings using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and buildingID = ? and permission not like "deleted"'
      } else {
        if (data.buildingID == -1)
          query = 'Select * from managers left join admin_company using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and companyID = ? and permission not like "deleted'
        else 
          query = 'Select * from managers left join admin_company using (companyID) left join buildings using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and companyID = ? and buildingID = ? and permission not like "deleted"'
      }

      sort_column = Number(data.sort_column);
      row_count = Number(data.row_count);
      page_num = Number(data.page_num);
      search_key = '%' + data.search_key + '%'
      if (sort_column === -1)
        query += ' order by managerID desc';
      else {
          if (sort_column === 0)
            query += ' order by firstname ';
          else if (sort_column === 1)
            query += ' order by email ';
          else if (sort_column === 2) {

          }
          else if (sort_column === 3) {

          }
          else if (sort_column === 4) {

          }
          query += data.sort_method;
      }
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, 
        data.companyID == -1 ? (data.buildingID == -1 ? [search_key, search_key, uid] : [search_key, search_key, uid, data.buildingID]) : (data.buildingID == -1 ? [search_key, search_key, uid, data.companyID] : [search_key, search_key, uid, data.companyID, data.buildingID])  ,
         (error, rows, fields) => {
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
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountManagerList(uid, data) {
    return new Promise((resolve, reject) => {
      let query;
      if (data.companyID == -1) {
        if (data.buildingID == -1)
          query = 'Select count(*) count from managers left join admin_company using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and permission not like "deleted"'
        else
          query = 'Select count(*) count from managers left join admin_company using (companyID) left join buildings using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and buildingID = ? and permission not like "deleted"'
      } else {
        if (data.buildingID == -1)
          query = 'Select count(*) count from managers left join admin_company using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and companyID = ? and permission not like "deleted'
        else 
          query = 'Select count(*) count from managers left join admin_company using (companyID) left join buildings using (companyID) where (lastname like ? or firstname like ?) and adminID = ? and companyID = ? and buildingID = ? and permission not like "deleted"'
      }
      search_key = '%' + data.search_key + '%'
      
      db.query(query, data.companyID == -1 ? (data.buildingID == -1 ? [search_key, search_key, uid] : [search_key, search_key, uid, data.buildingID]) : (data.buildingID == -1 ? [search_key, search_key, uid, data.companyID] : [search_key, search_key, uid, data.companyID, data.buildingID]) , (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
          resolve(rows[0].count)  
        }
      })
    })
  }

/**
 * create manager data
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createManager(uid, data, file_name) {
  return new Promise((resolve, reject) => {
    let password = bcrypt.hashSync("123456")
    let confirm_query = 'Select * from ' + table.MANAGERS + ' where email = ?';
    let query = 'Insert into ' + table.MANAGERS + ' (companyID, lastname, firstname, email, password, phone, photo_url, role_companies, role_buildings, role_chat, role_assemblies, role_owners, role_incidents, role_events, role_team, role_providers, role_announcements, role_addons, role_invoices, role_payment_methods) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(confirm_query, [data.email], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        if (rows.length > 0)
          reject({ message: message.MANAGER_ALREADY_EXIST })
        else {
          db.query(query, [ data.companyID, data.lastname, data.firstname, data.email, password, data.phone, file_name, data.role_companies, data.role_buildings, data.role_chat, data.role_assemblies, data.role_owners, data.role_incidents,data.role_events, data.role_team, data.role_providers, data.role_announcements, data.role_addons, data.role_invoices, data.role_payment_methods], (error, rows, fields) => {
            if (error) {
              reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
              let query = 'select * from ' + table.MANAGERS + ' where email = ?'
              db.query(query, [data.email], (error, rows, fields) => {
                if (error) {
                  reject({ message: message.INTERNAL_SERVER_ERROR})
                } else {
                  let managerID = rows[0].managerID;
                  let query = 'insert into ' + table.MANAGER_BUILDING + ' (managerID, buildingID) values (?, ?)'
                  let buildingIDs = data.buildingID.split(",");
                  for (let i in buildingIDs) {
                    db.query(query, [managerID, buildingIDs[i]], (error, rows, fields) => {
                      if (error)
                        reject({ message: message.INTERNAL_SERVER_ERROR})
                    })
                  }
                  resolve("ok");
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
 * get manager
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getManager(uid) {
  return new Promise((resolve, reject) => {
      let get_manager_query = 'Select * from ' + table.MANAGERS + ' where managerID = ?' 
      let building_query = 'Select * from ' + table.MANAGER_BUILDING + ' where managerID = ?'
      db.query(get_manager_query, [ uid ], (error, rows, fields) => {
          if (error) {
            reject({ message: message.INTERNAL_SERVER_ERROR })
          } else {
              db.query(building_query, [uid], (error, rows1, fields) => {
                if (error) {
                  reject({ message: message.INTERNAL_SERVER_ERROR});
                } else {
                  resolve({manager: rows, buildingList: rows1})
                }
              })
          }
      })
  })
}

/**
 * update manager
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateManager(id, data) {
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

module.exports = companyModel

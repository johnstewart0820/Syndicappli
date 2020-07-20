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
const timeHelper = require('../../helper/timeHelper')

var companyModel = {
  getCompanyListByUser: getCompanyListByUser,
  getBuildingListByUser: getBuildingListByUser,
  getManagerList: getManagerList,
  getCountManagerList: getCountManagerList,
  checkDuplicateManager: checkDuplicateManager,
  createManager: createManager,
  getManager: getManager,
  updateManager: updateManager,
}

/**
 * get count for building list for search filter
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * @author  Taras Hryts <streaming9663@gmail.com>
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getManagerList(uid, data) {
    return new Promise((resolve, reject) => {
      let query = `Select *, u.email email from ` + table.USERS + 
                  ` u left join ` + table.USER_RELATIONSHIP + 
                  ` r using (userID) left join ` + table.BUILDINGS + 
                  ` b on b.buildingID = r.relationID left join ` + table.COMPANIES + 
                  ` c using (companyID) where u.permission = "active" and u.usertype = "manager" and u.firstname like ? and u.lastname like ? and u.created_by = ?`
      search_key = '%' + data.search_key + '%'
      let params = [search_key, search_key, uid];
      if (data.buildingID != -1) {
        query += ` and b.buildingID = ?`
        params.push(data.buildingID)
      }
      else if (data.companyID != -1) {
        query += ` and c.companyID = ?`
        params.push(data.companyID)
      }

      sort_column = Number(data.sort_column);
      row_count = Number(data.row_count);
      page_num = Number(data.page_num);
      
      if (sort_column === -1)
        query += ' order by userID desc';
      else {
          if (sort_column === 0)
            query += ' order by firstname ';
          else if (sort_column === 1) 
            query += ' order by lastname ';
          else if (sort_column === 2)
            query += ' order by email ';
          else if (sort_column === 3) {

          }
          else if (sort_column === 4) {

          }
          else if (sort_column === 5) {

          }
          query += data.sort_method;
      }
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, params, (error, rows, fields) => {
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
function getCountManagerList(uid, data) {
    return new Promise((resolve, reject) => {
      let query = `Select count(*) count from ` + table.USERS + 
                  ` u left join ` + table.USER_RELATIONSHIP + 
                  ` r using (userID) left join ` + table.BUILDINGS + 
                  ` b on b.buildingID = r.relationID left join ` + table.COMPANIES + 
                  ` c using (companyID) where u.permission = "active" and u.usertype = "manager" and u.firstname like ? and u.lastname like ? and u.created_by = ?`
      search_key = '%' + data.search_key + '%'
      let params = [search_key, search_key, uid];
      if (data.buildingID != -1) {
        query += ` and b.buildingID = ?`
        params.push(data.buildingID)
      }
      else if (data.companyID != -1) {
        query += ` and c.companyID = ?`
        params.push(data.companyID)
      }
      
      db.query(query, params , (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
          resolve(rows[0].count)  
        }
      })
    })
  }

  
/**
 * verify duplicate manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function checkDuplicateManager(data) {
  return new Promise((resolve, reject) => {
    let confirm_query = 'Select * from ' + table.MANAGERS + ' where email = ?';

    db.query(confirm_query, [data.email], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        if (rows.length > 0)
          reject({ message: message.MANAGER_ALREADY_EXIST })
        else {
          resolve("ok")
        }
      }
    })
  })
}

/**
 * create manager data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createManager(uid, data, file) {
  return new Promise( async (resolve, reject) => {
    let file_name
    if (file)  {
      uploadS3 = await s3Helper.uploadLogoS3(file, s3buckets.AVATAR)
      file_name = uploadS3.Location
    }

    let password = bcrypt.hashSync("123456")
    let query = 'Insert into ' + table.USERS + ' (usertype, firstname, lastname, email, password, phone, photo_url, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [ "manager", data.firstname, data.lastname, data.email, password, data.phone, file_name, uid, timeHelper.getCurrentTime(), timeHelper.getCurrentTime()], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        let query = 'select * from ' + table.USERS + ' where email = ?'
        db.query(query, [data.email], (error, rows, fields) => {
          if (error) {
            reject({ message: message.INTERNAL_SERVER_ERROR})
          } else {
            let managerID = rows[0].userID;
            let query = `Insert into ` + table.USER_RELATIONSHIP + ` (userID, type, relationID) Values (?, ?, ?)`
            let buildingID = JSON.parse(data.buildingID);
            for (let i in buildingID) {
              db.query(query, [managerID, "building", buildingID[i]], (error, rows, fields) => {
                if (error) {
                  reject({ message: message.INTERNAL_SERVER_ERROR })
                } 
              })
            }
            let query = 'insert into ' + table.ROLE + ' (userID, role_name, permission) values (?, ?, ?)'
            let permission_info = JSON.parse(data.permission_info)

            for (let i in permission_info) {
              db.query(query, [managerID, permission_info[i].role_name, permission_info[i].permission], (error, rows, fields) => {
                if (error)
                  reject({ message: message.INTERNAL_SERVER_ERROR})
              })
            }
            resolve("ok");
          }
        })

      }
    })
  })
}

/**
 * get manager
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getManager(uid) {
  return new Promise((resolve, reject) => {
      let get_manager_query = 'Select * from ' + table.USERS + ' left join ' + table.ROLE + ' using (userID) where userID = ?' 
      
      db.query(get_manager_query, [ uid ], (error, rows, fields) => {
          if (error) {
            reject({ message: message.INTERNAL_SERVER_ERROR })
          } else {
              let building_query = 'Select * from ' + table.USER_RELATIONSHIP + ' where userID = ?'
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
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateManager( id, data, file) {
  return new Promise( async (resolve, reject) => {
      let file_name
      if (file)  {
        uploadS3 = await s3Helper.uploadLogoS3(file, s3buckets.AVATAR)
        file_name = uploadS3.Location
      }

      let query = 'UPDATE ' + table.USERS + ' SET firstname = ?, lastname = ?, email = ?, phone = ?, photo_url = ?, updated_at = ? WHERE userID = ?'
      db.query(query, [ data.firstname, data.lastname, data.email, data.phone, id, file_name, timeHelper.getCurrentTime() ],   (error, rows, fields) => {
          if (error) {
            reject({ message: message.INTERNAL_SERVER_ERROR })
          } else {
            let query = 'Delete from ' + table.ROLE + ' where userID = ?' 
            db.query(query, [id], async (error, rows, fields) => {
              if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR });
              } else {
                let query = `Insert into ` + table.USER_RELATIONSHIP + ` (userID, type, relationID) Values (?, ?, ?)`
                let buildingID = JSON.parse(data.buildingID);
                for (let i in buildingID) {
                  db.query(query, [id, "building", buildingID[i]], (error, rows, fields) => {
                    if (error) {
                      reject({ message: message.INTERNAL_SERVER_ERROR })
                    } 
                  })
                }
                let query = 'insert into ' + table.ROLE + ' (userID, role_name, permission) values (?, ?, ?)'
                let permission_info = JSON.parse(data.permission_info)

                for (let i in permission_info) {
                  db.query(query, [id, permission_info[i].role_name, permission_info[i].permission], (error, rows, fields) => {
                    if (error)
                      reject({ message: message.INTERNAL_SERVER_ERROR})
                  })
                }
                resolve("ok");
              }
            })
          }
      })
  })
}

module.exports = companyModel

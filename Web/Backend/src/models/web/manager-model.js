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

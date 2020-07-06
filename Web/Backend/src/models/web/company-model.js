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
  getCompanyList: getCompanyList,
  getCountCompanyList: getCountCompanyList,
}


/**
 * get company list with filter key
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompanyList(uid, data) {
    return new Promise((resolve, reject) => {

      let query = `SELECT
      *, companyID (ID) 
      FROM
      companies
      LEFT JOIN admin_company USING ( companyID )
      LEFT JOIN ( SELECT count( * ) count, companyID FROM managers ) m USING ( companyID )
      LEFT JOIN ( SELECT firstname manager_firstname, lastname manager_lastname, companyID FROM managers GROUP BY companyID ) n USING ( companyID )
      where adminID = ? and name like ? and permission not like "deleted"`
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
            query += ' order by manager_firstname ';
          else if (sort_column === 2)
            query += ' order by email ';
          else if (sort_column === 3)
            query += ' order by phone ';
          else if (sort_column === 4)
            query += ' order by count ';
          else if (sort_column === 5)
            query += ' ';
          else if (sort_column === 6)
            query += ' order by status ';
          query += data.sort_method;
      }
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, [uid, search_key], (error, rows, fields) => {
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
function getCountCompanyList(uid, data) {
    return new Promise((resolve, reject) => {
      let query = `SELECT
      count(*) count 
      FROM
      companies
      LEFT JOIN admin_company USING ( companyID )
      LEFT JOIN ( SELECT count( * ) count, companyID FROM managers ) m USING ( companyID )
      LEFT JOIN ( SELECT firstname manager_firstname, lastname manager_lastname, companyID FROM managers GROUP BY companyID ) n USING ( companyID )
      where adminID = ? and name like ? and permission not like "deleted"`
      search_key = '%' + data.search_key + '%'
      
      db.query(query, [uid, search_key], (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
          resolve(rows[0].count)  
        }
      })
    })
  }



module.exports = companyModel

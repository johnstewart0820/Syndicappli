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

var ownerModel = {
    getOwnerList:getOwnerList,
    getCountOwnerList:getCountOwnerList
}

/**
 * get company list with filter key
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getOwnerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select o.*,
                  (select count(*) from ` + table.APARTMENTS + ` a left join ` + table.VOTE_AMOUNT_OF_PARTS + ` va on va.apartmentID = a.apartmentID where a.userID = o.userID) as apartment_count
                  from ` + table.USERS + ` o
                  where o.firstname like ? and o.usertype = "owner" and o.permission = "active" and o.status = "active"`
        if (data.buildingID !== "-1") {
            query += ` and o.builingID in (` + data.buildingID + `)`
        }

        sort_column = Number(data.sort_column);
        row_count = Number(data.row_count);
        page_num = Number(data.page_num);
        search_key = '%' + data.search_key + '%'
        if (sort_column === -1)
            query += ' order by o.userID desc';
        else {
            if (sort_column === 0)
                query += ' order by o.lastname ';
            else if (sort_column === 1)
                query += ' order by o.firstname ';
            else if (sort_column === 2) {
                query += ' order by o.email ';
            }
            else if (sort_column === 3) {
                query += ' order by o.phone ';
            }
            else if (sort_column === 4) {
                query += ' order by o.onwer_role ';
            }
            query += data.sort_method;
        }
        query += ' limit ' + page_num * row_count + ',' + row_count
        db.query(query, [search_key], (error, rows, fields) => {
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
function getCountOwnerList(uid, data) {
    return new Promise((resolve, reject) => {
        let query = `select count(*) count
                  from ` + table.USERS + ` o
                  where o.firstname like ? and o.usertype = "owner" and o.permission = "active" and o.status = "active"`
        if (data.buildingID !== "-1") {
            query += ` and o.builingID in (` + data.buildingID + `)`
        }
        search_key = '%' + data.search_key + '%'

        db.query(query, [search_key], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows[0].count)
            }
        })
    })
}

module.exports = ownerModel

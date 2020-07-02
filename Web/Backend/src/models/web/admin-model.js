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

var adminModel = {
  getProfile: getProfile,
  updateProfile: updateProfile,
  getUserList: getUserList,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getCompanyList: getCompanyList,
  getAllCompanyList: getAllCompanyList,
  getBuildingList: getBuildingList,
  getBuildingListByCompany: getBuildingListByCompany,
  getBuildingListByUserAndCompany: getBuildingListByUserAndCompany,
}

/**
 * get profile data for user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getProfile(uid) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM ' + table.ADMIN + ' Left Join ' + table.ADMIN_ROLE + ' Using (adminID) WHERE adminID = ? and status = "active"'

    db.query(query, [ uid ], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR })
      } else {
        resolve(rows[0])  
      }
    })
  })
}

/**
 * update profile data for user
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateProfile(uid, data, file_name) {
  return new Promise((resolve, reject) => {
    if (data.new_password === "" || data.new_password === undefined) {
        if (file_name === "") {
            let query = 'UPDATE ' + table.ADMIN + ' SET lastname = ?, firstname = ?, email = ?, phone = ? WHERE adminID = ?'
            db.query(query, [ data.lastname, data.firstname, data.email, data.phone, uid], (error, rows, fields) => {
              if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
              } else {
                resolve(uid)  
              }
            })            
        } else {
            let query = 'UPDATE ' + table.ADMIN + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, photo_url = ? WHERE adminID = ?'
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
                    let query = 'UPDATE ' + table.ADMIN + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, password = ? WHERE adminID = ?'
                    db.query(query, [ data.lastname, data.firstname, data.email, data.phone, hash_new_password, file_name, uid ], (error, rows, fields) => {
                      if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                      } else {
                        resolve(profile.adminID)  
                      }
                    })
                  } else {
                    let query = 'UPDATE ' + table.ADMIN + ' SET lastname = ?, firstname = ?, email = ?, phone = ?, password = ?, photo_url = ? WHERE adminID = ?'
                    db.query(query, [ data.lastname, data.firstname, data.email, data.phone, hash_new_password, file_name, uid ], (error, rows, fields) => {
                      if (error) {
                        reject({ message: message.INTERNAL_SERVER_ERROR })
                      } else {
                        resolve(profile.adminID)  
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
 * get user list with filter key
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getUserList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM ' + table.ADMIN + ' WHERE (lastname like ? or firstname like ? or email like ? or phone like ?) and status = "active"'
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
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, [ search_key, search_key, search_key, search_key ], (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
          getCountUserList(data).then((data) => {
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
 * get count for user list for search filter
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountUserList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT count(*) count FROM ' + table.ADMIN + ' WHERE (lastname like ? or firstname like ? or email like ? or phone like ?) and status = "active"'
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
 * create user data
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createUser(uid) {
    return new Promise((resolve, reject) => {
      getProfile(uid).then((profile) => {
        let query = 'Insert into ' + table.USER + ' (lastname, firstname, email, phone, '
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
 * get user data
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getUser(uid) {
    return new Promise((resolve, reject) => {
      getProfile(uid).then((profile) => {
        let query = 'SELECT buildingID, building_name FROM ' + table.USER + ' Left Join ' + table.BUILDING_MANAGER + ' USING (userID) Left Join ' + table.BUILDING + ' USING (buildingID) '
                        + 'WHERE userID = ? and ' + table.BUILDING + '.permission = "true"'
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
 * @author  DongTuring <dong@turing.com>
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
 * @author  DongTuring <dong@turing.com>
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
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCompanyList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM ' + table.COMPANIES + ' WHERE (company_name like ? or company_address like ? or company_email like ? or company_phone like ?) and permission = "true"'
      sort_column = Number(data.sort_column);
      row_count = Number(data.row_count);
      page_num = Number(data.page_num);

      search_key = '%' + data.search_key + '%'
      if (sort_column === -1)
        query += ' order by companyID desc';
      else {
          if (sort_column === 0)
            query += ' order by company_name ';
          else if (sort_column === 1)
            query += ' order by company_address ';
          else if (sort_column === 2)
            query += ' order by company_email ';
          else if (sort_column === 3)
            query += ' order by company_phone ';
          else if (sort_column === 4)
            query += ' order by company_manager_count ';
          else if (sort_column === 5)
            query += ' order by company_member_count ';
            
          query += data.sort_method;
      }
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, [ search_key, search_key, search_key, search_key ], (error, rows, fields) => {
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
 * get all company list
 *
 * @author  DongTuring <dong@turing.com>
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
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountCompanyList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT count(*) count FROM ' + table.COMPANIES + ' WHERE (company_name like ? or company_address like ? or company_email like ? or company_phone like ?) and permission = "true"'
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
 * get building list with filter key
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM ' + table.BUILDING + ' WHERE (company_name like ? or company_address like ? or company_email like ? or company_phone like ?) and permission = "true"'
      sort_column = Number(data.sort_column);
      row_count = Number(data.row_count);
      page_num = Number(data.page_num);
      search_key = '%' + data.search_key + '%'
      if (sort_column === -1)
        query += ' order by companyID desc';
      else {
          if (sort_column === 0)
            query += ' order by company_name ';
          else if (sort_column === 1)
            query += ' order by company_address ';
          else if (sort_column === 2)
            query += ' order by company_email ';
          else if (sort_column === 3)
            query += ' order by company_phone ';
          else if (sort_column === 4)
            query += ' order by company_manager_count ';
          else if (sort_column === 5)
            query += ' order by company_member_count ';
            
          query += data.sort_method;
      }
      query += ' limit ' + page_num * row_count + ',' + row_count
      db.query(query, [ search_key, search_key, search_key, search_key ], (error, rows, fields) => {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR })
        } else {
            getCountBuildingList(data).then((data) => {
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
 * get count for building list for search filter
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountBuildingList(data) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT count(*) count FROM ' + table.BUILDING + ' WHERE (company_name like ? or company_address like ? or company_email like ? or company_phone like ?) and permission = "true"'
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
 * get count for building list for search filter
 *
 * @author  DongTuring <dong@turing.com>
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
 * get count for building list for search filter
 *
 * @author  DongTuring <dong@turing.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getBuildingListByUserAndCompany(data) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT buildingID, building_name FROM ' + table.USER + ' Left Join ' + table.BUILDING_MANAGER + ' USING (userID) Left Join ' + table.BUILDING + ' USING (buildingID) '
        + 'WHERE userID = ? and ' + table.BUILDING + '.permission = "true"'
        db.query(query, [ data.userID ], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                getBuildingListByCompany(data.companyID).then((buildings) => {
                    for (let i = 0; i < buildings.length; i ++) {
                        buildings[i].selected = false;
                    }
                    for (let i = 0; i < buildings.length; i ++) {
                        for (let j = 0; j < rows.length; j ++) {
                            if (buildings[i].buildingID === rows[j].buildingID)
                                buildings[i].selected = true;
                        }
                    }
                    resolve(buildings)
                })
            }
        })
    })
  }

module.exports = adminModel

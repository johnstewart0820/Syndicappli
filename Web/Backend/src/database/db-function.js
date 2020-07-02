/**
 * Database control file
 *
 * @package   backend/src/database
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

/**
 * Function that check the connection is exist or not from pool
 *
 * @author  DongTuring <dong@turing.com>
 * @return  string success if connection existed returns success else returns err
 */
function connectionCheck(pool) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        if (connection) connection.release()
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}

module.exports = {
  connectionCheck: connectionCheck
}

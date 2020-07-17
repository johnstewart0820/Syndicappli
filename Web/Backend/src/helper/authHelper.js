/**
 * Authenticate helper file
 *
 * @package   backend/src/helper
 * @author    Taras <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var message = require('../constants/message')

const authHelper = {
    hasBuildingPermission: hasBuildingPermission
}

function hasBuildingPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_buildings == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

module.exports = authHelper
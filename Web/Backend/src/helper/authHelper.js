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
    hasCompanyPermission: hasCompanyPermission,
    hasManagerPermission: hasManagerPermission,
    hasProductPermission: hasProductPermission,
    hasBuildingPermission: hasBuildingPermission,
    hasOwnerPermission: hasOwnerPermission,
    hasOrderPermission: hasOrderPermission,
    hasDiscountcodePermission: hasDiscountcodePermission,
    hasUserPermission: hasUserPermission
}

function hasCompanyPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        let status = false
        for (i in permission) {
            if (userdata.role_companies == permission[i]){
                status = true
                break
            } else {
                continue
            }
        }
        if(status == true){
            resolve("true")
        }else{
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

function hasManagerPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_managers == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

function hasBuildingPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        for (i in permission) {
            if (userdata.role_buildings == permission[i]){
                resolve("true")
            }
        }
        reject({ messsage: message.HAS_NO_PERMISSION })
    })
}

function hasOwnerPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        for (i in permission) {
            if (userdata.role_owners == permission[i]){
                resolve("true")
            }
        }
        reject({ messsage: message.HAS_NO_PERMISSION })
    })
}

function hasOrderPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_orders == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

function hasProductPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_products == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

function hasDiscountcodePermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_discountcodes == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

function hasUserPermission(userdata, permission){
    return new Promise((resolve, reject) => {
        if(userdata.role_users == permission){
            resolve("true")
        } else {
            reject({ messsage: message.HAS_NO_PERMISSION })
        }
    })
}

module.exports = authHelper
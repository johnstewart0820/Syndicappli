/**
 * Auth router file
 * 
 * @package   backend/src/routes
 * @author    Taras Hryts <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth
 */

var express = require('express')
var router = express.Router()

const authMiddleware = require('../../middleware/auth-middleware')
const managerMobileService = require('../../services/mobile/manager/account-service')

/**
 * profile api
 */
router.get('/profile', authMiddleware.checkToken, getProfile)
router.post('/profile', authMiddleware.checkToken, updateProfile)

/**
 * Function that get profile data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getProfile(req, res) {
    let userId = req.decoded.uid

    managerMobileService.getProfile(userId).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

/**
 * Function that update profile data
 *
 * @author  Taras Hryts <streaming9663@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */


function updateProfile(req, res) {
    // var form = new formidable.IncomingForm();
    // let file_name = "";
    // let userId = req.decoded.uid
    // form.on('fileBegin', function (name, file){
    //     file_name = Date.now() + '.jpg';
    //     file.path = '/tmp/' + file_name;
    // });
    //
    // form.parse(req, function (err, fields, files) {
    //     adminService.updateProfile(userId, fields, files).then((result)=>{
    //         res.json(result)
    //     }).catch((err) => {
    //         res.json(err)
    //     });
    // });
}


module.exports = router

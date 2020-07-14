/**
 * Mail constant file
 *
 * @package   backend/src/constants
 * @author    Taras <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */
const dotenv = require('dotenv')
dotenv.config()
/**
 * API constants
 */
const mail = {
    TYPE_FORGOT_PASSWORD: 1,

    TITLE_FORGOT_PASSWORD: "Recovery your password"
}

module.exports = mail

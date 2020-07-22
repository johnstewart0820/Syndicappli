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
    TYPE_SUBACCOUNT_INVITE: 2,
    TITLE_FORGOT_PASSWORD: "Recovery your password",
    TITLE_SUBACCOUNT_INVITE: "You're invited as a subaccount"
}

module.exports = mail

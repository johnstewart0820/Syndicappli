/**
 * Timer constant file
 *
 * @package   backend/src/constants
 * @author    DongTuring <dong@turing.com>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */
const dotenv = require('dotenv')
dotenv.config()

/**
 * Code constants
 */
const timer = {
  VISIT_SESSION_MINS: process.env.VISIT_SESSION_TIME,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION
}

module.exports = timer

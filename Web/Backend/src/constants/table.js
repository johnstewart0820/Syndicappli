/**
 * Database table constant file
 *
 * @package   backend/src/constants
 * @author    WangTuring <wangwang@turing.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

/**
 * Database table constants
 */
const tables = {
    USERS : 'users',
    USERROLE : 'user_role',
    ROLE : 'role',
    ADMIN_ROLE: 'admin_role',
    ADMIN_COMPANY: 'admin_company',
    COMPANIES: 'companies',
    BUILDING_MANAGER: 'building_manager',
    BUILDINGS: 'buildings',
    BUILDING_VOTE_BRANCH: 'building_vote_branch',
    VOTEBRANCH: 'vote_branch',
    MANAGERS: 'managers',
    MANAGER_BUILDING: 'manager_building',
    INVOICES: 'invoices'
}

module.exports = tables

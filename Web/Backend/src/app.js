/**
 * Init file
 *
 * @package    src
 * @author     DongTuring <dong@turing.com>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly
 */

var express = require('express')
var path = require('path')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
const dotenv = require('dotenv')
var apiRouter = require('./routes/index')
var authMiddleware = require('./middleware/auth-middleware')

dotenv.config()
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '../public/upload')))
app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', path.join(__dirname, 'views'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'})); 

app.use('/api', apiRouter)

module.exports = app

/**
 * MAIL helper file
 *
 * @package   backend/src/helper
 * @author    Taras <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

const dotenv = require('dotenv')
dotenv.config()
const Mailer = require('nodemailer');

function sendMail(title, email, type, token) {
    return new Promise( async (resolve, reject) => {
        var emailContent = require(`../emailTemplate/${type}`)

        var transporter = Mailer.createTransport({
            host: process.env.EMAIL_HOST,
            secure: false,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PWD
            }
        });

        const data = {
            from: "Syndicappli Support Team <" + process.env.EMAIL_USER + ">",
            to: email,
            subject: title,
            html: `${emailContent.body}` + `${token}` + `${emailContent.body1}`
        };

        await transporter.sendMail(data, function (err, info) {
            if(err){
                reject({message: err})
            }else{
                resolve(info)
            }
        })
    })
}

module.exports = {
    sendMail:sendMail
}

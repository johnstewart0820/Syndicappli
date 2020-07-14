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
const mailgun = require("mailgun-js");

function sendMail(title, email, type, token){
    return new Promise((resolve, reject) => {
        const DOMAIN = process.env.MAILGUN_DOMAIN;
        const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
        var emailContent = require(`../emailTemplate/${type}`)

        const data = {
            from: "Syndicappli Support Team <postmaster@sandboxd4abcb2dc5bc4ac2916fcbcbc0028c49.mailgun.org>",
            to: email,
            subject: title,
            html: `${emailContent.body}` + `${emailContent.url}` + `${token}` + `&email=` + `${email}` + `${emailContent.body1}`
        };

        mg.messages().send(data, function (error, body) {
            if(error){
                reject({message: error})
            }else {
                resolve(body)
            }
        });
    })
}

module.exports = {
    sendMail:sendMail
}

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    url: process.env.DEVELOPMENT_ENDPOINT + '/resetPassword?token=',
    body: `
        <html>
            <body>
                <div style="display: block;padding-top: 50px;padding-left: 100px;padding-right: 100px;padding-bottom: 100px;">
                    <div style="width: 100%;text-align: center;margin-top: 20px;">
                        <span style="font-size: 12px;font-weight: 500;">You can reset your password by clicking the link below. </span>
                    </div>
                    <div style="width: 100%;text-align: center;margin-top: 20px;">
                        <a href="
            `,
    body1: `" style="font-size: 12px;font-weight: bold;text-decoration: none;padding: 10px;background: #20a8d8;color: white;">Reset Password</a>
                    </div>
                    <div style="width: 100%;text-align: center;margin-top: 10px;">
                        <span style="font-size: 12px;font-weight: 500;"><b>Please note: </b>This link will expire in 15 minutes. </span>
                    </div>
                </div>
            </body>
        </html>
    `
}
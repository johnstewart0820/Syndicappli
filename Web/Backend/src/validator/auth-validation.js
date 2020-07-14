const { Joi } = require('express-validation')

module.exports = {
    login:{
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    },
    verifySMS:{
        body: Joi.object({
            email: Joi.string().required(),
            code: Joi.string().required()
        })
    }
}
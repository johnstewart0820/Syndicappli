const { Joi } = require('express-validation')

module.exports = {
    company:{
        body: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            SIRET: Joi.string().required(),
            VAT: Joi.string().required(),
            account_holdername: Joi.string().required(),
            account_address: Joi.string().required(),
            account_IBAN: Joi.string().required(),
            access_360cam: Joi.string().required(),
            access_webcam: Joi.string().required(),
            access_audio: Joi.string().required(),
            status: Joi.string().required()
        })
    }
}
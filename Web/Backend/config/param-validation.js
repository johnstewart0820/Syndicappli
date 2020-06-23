const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/standards
  createStandard: {
    body: {
      name: Joi.string().required(),
      //description: Joi.string().required()
    }
  },

  // PUT /api/standards/:standardId
  updateStandard: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required()
    },
    params: {
      standardId: Joi.string().hex().required()
    }
  },

  // POST /api/standards/:standardId/assessment-data
  popluateAssessmentData: {
    body: {
      data: Joi.object().required()
    },
    params: {
      standardId: Joi.string().hex().required()
    }
  }
};

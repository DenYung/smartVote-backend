const Joi = require("joi");

const validateLoginInput = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateStudentRegistrationInput = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  faculty: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateAdminRegistrationInput = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateLoginInput,
  validateStudentRegistrationInput,
  validateAdminRegistrationInput,
};

const Joi = require("joi");

const validateUserSchema = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(10).required(),
  });
  return schema.validate(user);
};

const validateUserLoginSchema = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(10).required(),
  });
  return schema.validate(user);
};

const validate = {
  validateUserSchema,
  validateUserLoginSchema,
};

module.exports = validate;

const Joi = require("joi");

const validateMealSchema = (user) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    ingrediants: Joi.string().min(3).max(255).required(),
    ingrediants: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(255).required(),
    category: Joi.string().min(3).max(255).required(),
    price: Joi.string().required(),
    cookingTime: Joi.string().required(),
    servings: Joi.string().min(3).max(255).required(),
    topMeal: Joi.string().required(),
    photo: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};

const validate = {
  validateMealSchema,
};

module.exports = validate;

const Joi = require("joi");
const mongoose = require("mongoose");

const allMealsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  ingrediants: {
    type: String,
    required: [true, "ingrediants required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  description: {
    type: String,
    required: [true, "description required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  category: {
    type: String,
    required: [true, "category required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },

  price: {
    type: String,
    required: [true, "price required "],
  },
  cookingTime: {
    type: String,
    required: [true, "cookingTime required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  servings: {
    type: String,
    required: [true, "servings required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  topMeal: {
    type: String,
    required: [true, "topMeal required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  photo: {
    type: String,
    required: [true, "photo required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const MealKitsModal = mongoose.model("meal-kits", allMealsSchema);
module.exports = MealKitsModal;

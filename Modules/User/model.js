const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  lastName: {
    type: String,
    required: [true, "lastName required "],
    minLength: [3, "minimum length is 3 "],
    maxLength: [255, "maximum length size is 255"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "password required "],
    minLength: [7, "minimum length is 7 "],
    maxLength: [255, "maximum length size is 255"],
  },
  role: {
    type: String,
    default: "rere",
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

const UserModal = mongoose.model("users", userSchema);
module.exports = UserModal;

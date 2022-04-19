const _ = require("lodash");
const mongoose = require("mongoose");
const UserModal = require("./model");
const { hashed } = require("../../utils/bcrypt");

exports.checkUserByEmail = async (email) => {
  return await UserModal.findOne({
    email,
  })
    .lean()
    .exec();
};

exports.addUser = async (data) => {
  const hashedPassword = await hashed(data.password);
  const userData = {
    ...data,
    password: hashedPassword,
  };
  try {
    const user = new UserModal(userData);
    return await user.save();
  } catch (error) {
    return error;
  }
};

exports.getUser = async (id) => {
  return await UserModal.findById(id).exec();
};

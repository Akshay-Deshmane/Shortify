import userModel from "../models/user.model.js";
import shortUrlModel from "../models/shortUrl.model";

export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const findUserByEmailByPassword = async (email) => {
  return await userModel.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
  return await userModel.findById(id);
};

export const createUser = async (name, email, password) => {
  const newUser = new userModel({ name, email, password });
  await newUser.save();
  return newUser;
};

export const getAllUserUrlsDao = async (id) => {
  return await shortUrlModel.find({ user: id });
};

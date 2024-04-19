const userMethod = require("../methods/user.methods");
const User = require("../models/User");

exports.createUserService = async (data) => {
  try {
    const emailExists = await User.findOne({ emailAddress: data.emailAddress });
    if (emailExists) {
      throw new Error("Email address already taken");
    }
    const userNameExists = await User.findOne({ userName: data.userName });
    if (userNameExists) {
      throw new Error("Username already taken");
    }

    const userPasswordExists = await User.findOne({ password: data.password });
    if (userPasswordExists) {
      throw new Error("Password already taken");
    }

    const result = await userMethod.createUserMethod(data);
    return result;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

exports.loginUserService = async (data) => {
  console.log("🚀 ~ exports.loginUserService= ~ data:", data);
  try {
    const result = await userMethod.loginMethod(data);
    return result;
  } catch (error) {
    console.log("🚀 ~ exports.loginUserService= ~ error:", error);
    throw new Error("User not found");
  }
};

exports.retrievePasswordService = async (emailAddress) => {
  try {
    const result = await userMethod.retrievePasswordMethod(emailAddress);
    return result;
  } catch (error) {
    throw new Error("Failed to find user");
  }
};

exports.updateUserService = async (id, data) => {
  try {
    const result = await userMethod.updateProfileMethod(id, data);
    return result;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};

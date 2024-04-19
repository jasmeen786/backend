const User = require("../models/User");

exports.createUserMethod = async (data) => {
  const result = await User.create(data);

  if (!result) {
    throw new Error("Failed to create user. Please try again");
  }

  return result;
};

exports.loginMethod = async (data) => {
  const user = await User.findOne({
    userName: data.username,
  });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (!user.password === data.password) {
    throw new Error("Incorrect password");
  }

  return user;
};

exports.retrievePasswordMethod = async (emailAddress) => {
  const user = await User.findOne({
    userName: emailAddress,
  });
  if (!user) {
    throw new Error("User does not exist");
  }

  return user.password;
};

exports.updateProfileMethod = async (id, data) => {
  const result = await User.findOneAndUpdate(
    {
      id: id,
    },
    {
      ...data,
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw new Error("Failed to update profile");
  }

  return result;
};

const User = require("../models/User");

exports.createUser = async (user) => {
  try {
    const newuser = User.create({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    return newuser;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  try {
    hashed_password = await bcrypt.hash(user.password, 10);
    const newuser = User.create({
      email: user.email,
      password: hashed_password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    return newuser;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

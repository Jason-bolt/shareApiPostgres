const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.login = (user) => {
  try {
    const access_token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
    const refresh_token = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRY }
    );

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

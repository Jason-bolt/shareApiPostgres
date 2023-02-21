const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailHelper = require("../helper/emailHelper");

exports.createUser = async (user) => {
  try {
    hashed_password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      email: user.email,
      password: hashed_password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    const messageSent = await emailHelper.sendConfirmatoryEmail(newUser);

    console.log(messageSent);
    if (messageSent.error) {
      return { error: messageSent.error };
    }

    // "role": "Basic",
    // "id": 1,
    // "email": "test@email.com",
    // "password": "$2b$10$WKOo3P4yUUiacXJZ450tv.DBGWyqk83VHuz9tULc9hHW37sVFbBjO",
    // "firstName": "Jason",
    // "lastName": "Appiatu",
    // "updatedAt": "2023-02-21T15:31:37.555Z",
    // "createdAt": "2023-02-21T15:31:37.555Z"

    return {
      role: newUser.role,
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      updatedAt: newUser.updatedAt,
      createdAt: newUser.createdAt,
    };
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

exports.refreshToken = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const data = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const acces_token = jwt.sign(data, process.env.JWT_TOKEN_SECRET);
    console.log(acces_token);
    return { acces_token: acces_token };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.updateUsername = async (username, userID) => {
  try {
    const { firstName, lastName } = username;
    await User.update(
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        where: {
          id: userID,
        },
      }
    );
    return true;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.deleteAccount = async (userID) => {
  try {
    const user = await User.findOne({
      where: {
        id: userID,
      },
    });

    if (!user) {
      return { error: "Invalid user ID" };
    } else {
      await User.destroy({
        where: {
          id: userID,
        },
      });
      return true;
    }
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

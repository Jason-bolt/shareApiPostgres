const User = require("../models/User");
const bcrypt = require("bcrypt");
const Testimony = require("../models/Testimony");

exports.createAdmin = async (user) => {
  try {
    hashed_password = await bcrypt.hash(user.password, 10);
    const newuser = await User.create({
      email: user.email,
      password: hashed_password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "Admin",
    });
    return newuser;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.approveTestimony = async (testimonyID) => {
  try {
    await Testimony.update(
      {
        isApproved: true,
      },
      {
        where: {
          id: testimonyID,
        },
      }
    );
    return true;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

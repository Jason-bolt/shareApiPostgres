const User = require("../models/User");
let Validator = require("validatorjs");

exports.userValidFields = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  let data = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  let rules = {
    email: "required|email",
    password: "required|string|min:6",
    firstName: "required|string",
    lastName: "required|string",
  };

  let validation = new Validator(data, rules);

  if (validation.fails()) {
    res.status(403).send({
      errors: validation.errors.errors,
    });
  } else {
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    req.user = user;
    next();
  }
};

exports.isUserUnique = async (req, res, next) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(409).send({
        error: "User already exsits",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

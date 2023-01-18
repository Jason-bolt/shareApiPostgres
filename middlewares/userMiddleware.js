const User = require("../models/User");
let Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.isPasswordAndUserMatch = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = {
      email: email,
      password: password,
    };

    const rules = {
      email: "required|email",
      password: "required|string",
    };
    let validation = new Validator(data, rules);

    if (validation.fails()) {
      res.status(403).send({
        errors: validation.errors.errors,
      });
    } else {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      // console.log(user);
      if (!user) {
        res.status(404).send({ error: "Invalid username or password!" });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          req.body = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          next();
        } else {
          res.status(404).send({ error: "Invalid username or password!" });
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
};

exports.isRefreshTokenValid = async (req, res, next) => {
  try {
    if (req.cookies?.jwt) {
      const refresh_token = req.cookies.jwt;

      jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
          if (err) {
            res.status(406).send({
              error: err,
            });
          } else {
            const email = decoded.email;
            req.email = email;
            next();
          }
        }
      );
    } else {
      res.status(406).send({
        error: "Unauthorized",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
};

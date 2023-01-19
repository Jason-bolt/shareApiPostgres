const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    // console.log(req);
    const user = await userService.createUser(req.user);
    if (user.error) {
      res.status(500).send({
        error: user.error,
      });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err,
    });
  }
};

exports.login = (req, res) => {
  try {
    const { access_token, refresh_token } = userService.login(req.body);
    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    });
    res.status(200).send({ access_token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const access_token = await userService.refreshToken(req.email);
    if (access_token.error) {
      res.status(500).send({
        error: access_token.error,
      });
    } else {
      res.send(access_token);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt").status(200).send({ message: "Logged out!" });
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userID = req.body.id;

    if (!userID) {
      return res.status(400).send({ error: "User ID is required!" });
    }

    const deleted = await userService.deleteAccount(userID);

    if (deleted) {
      res.clearCookie("jwt").status(200).send("Account deleted!");
    } else {
      res.status(500).send({ error: deleted.error });
    }
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

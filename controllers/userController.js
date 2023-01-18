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

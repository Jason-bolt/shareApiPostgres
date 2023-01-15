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

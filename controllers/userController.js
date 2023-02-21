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
    const { access_token } = userService.login(req.body);

    res.status(200).send({ access_token });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

// exports.refreshToken = async (req, res) => {
//   try {
//     const access_token = await userService.refreshToken(req.email);
//     if (access_token.error) {
//       res.status(500).send({
//         error: access_token.error,
//       });
//     } else {
//       res.send(access_token);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: err });
//   }
// };

exports.updateUsername = async (req, res) => {
  try {
    userID = req.user.id;
    const { firstName, lastName } = req.username;
    const username = {
      firstName: firstName,
      lastName: lastName,
    };
    const updatedUsername = await userService.updateUsername(username, userID);
    if (updatedUsername.error) {
      res.status(500).send({ error: updatedUsername.error });
    } else {
      res.status(200).send({ message: "Username updated!" });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).send({ message: "Logged out!" });
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
      res.status(200).send({ message: "Account deleted!" });
    } else {
      res.status(500).send({ error: deleted.error });
    }
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

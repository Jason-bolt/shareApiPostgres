const adminService = require("../services/adminService");

exports.createAdmin = async (req, res) => {
  try {
    // console.log(req);
    const user = await adminService.createAdmin(req.user);
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

exports.approveTestimony = async (req, res) => {
  try {
    const testimonyID = req.params.testimonyID;
    if (!testimonyID) {
      return res.status(403).send({ error: "Testimony ID is required!" });
    }
    if (isNaN(testimonyID)) {
      return res.status(400).send({ error: "Testimony ID must be an integer" });
    }
    const approved = await adminService.approveTestimony(testimonyID);

    if (approved.error) {
      return res.status(500).send({
        error: approved.error,
      });
    }

    if (approved) {
      res.status(200).send({ message: "Testimony approved!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err,
    });
  }
};

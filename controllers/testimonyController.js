const testimonyService = require("../services/testimonyService");

exports.createTestimony = async (req, res) => {
  try {
    const { testimony, tags } = req.body;
    const testimonyPayload = {
      testimony: testimony,
      tags: tags,
    };

    const userID = req.user.id;
    const newTestimony = await testimonyService.createTestimony(
      testimonyPayload,
      userID
    );

    if (newTestimony.error) {
      res.status(500).send({
        error: newTestimony.error,
      });
    } else {
      res.status(201).send(newTestimony);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err,
    });
  }
};

exports.updateTestimony = async (req, res) => {
  try {
    const { testimony, tags } = req.body;
    const testimonyPayload = {
      testimony: testimony,
      tags: tags,
    };
    const testimonyID = req.query.id;
    console.log(testimonyID);
    const updated = await testimonyService.updateTestimony(
      testimonyPayload,
      testimonyID
    );

    if (updated) {
      res.status(200).send("Testimony updated");
    } else {
      res.status(500).send({
        error: updated.error,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err,
    });
  }
};

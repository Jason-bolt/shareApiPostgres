const testimonyService = require("../services/testimonyService");

exports.createTestimony = async (req, res) => {
  try {
    const { testimony, tags } = req.body;
    const testimonyPayload = {
      testimony: testimony,
      tags: tags,
    };
    const newTestimony = await testimonyService.createTestimony(
      testimonyPayload
    );

    if (newTestimony.error) {
      res.status(403).send({
        error: newTestimony.error,
      });
    } else {
      res.send(newTestimony);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err,
    });
  }
};

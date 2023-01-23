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

exports.getUserTestimonies = async (req, res) => {
  try {
    const userID = req.user.id;
    const testimonies = await testimonyService.getUserTestimonies(userID);

    if (!testimonies) {
      res.status(404).send({
        error: "Testimonies cannot be found for user!",
      });
    } else {
      res.status(200).send({ testimonies });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
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

exports.deleteTestimony = async (req, res) => {
  try {
    const testimonyID = req.body.id;

    if (!testimonyID) {
      return res.status(400).send({ error: "Testimony ID is required!" });
    }

    const deleted = await testimonyService.deleteTestimony(testimonyID);

    if (deleted) {
      res.status(200).send("Testimony deleted!");
    } else {
      res.status(500).send({ error: deleted.error });
    }
  } catch (err) {
    return { error: err };
  }
};

const publicService = require("../services/publicService");

exports.getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await publicService.getAllTestimonies();
    if (testimonies.error) {
      res.status(500).send({
        error: testimonies.error,
      });
    }
    res.status(200).send(testimonies);
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

exports.getOneTestimony = async (req, res) => {
  try {
    const testimonyID = req.params.id;

    if (!testimonyID) {
      return res.status(404).send({ error: "Testimony cannot be found!" });
    }
    if (isNaN(testimonyID)) {
      return res.status(400).send({ error: "ID must be an integer" });
    }
    const testimony = await publicService.getOneTestimony(testimonyID);
    if (testimony.error) {
      res.status(500).send({
        error: testimony.error,
      });
    }
    res.status(200).send(testimony);
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const tag = req.query.tag;
    const testimonies = await publicService.search(tag);

    if (testimonies.error) {
      res.status(500).send({
        error: testimonies.error,
      });
    } else {
      res.status(200).send({ testimonies });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

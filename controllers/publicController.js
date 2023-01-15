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

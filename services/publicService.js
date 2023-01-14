const Testimony = require("../models/Testimony");

exports.getAllTestimonies = async () => {
  try {
    const testimonies = await Testimony.findAll();
    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

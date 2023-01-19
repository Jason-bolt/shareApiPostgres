const Testimony = require("../models/Testimony");
const { fn, col, Op } = require("sequelize");

exports.getAllTestimonies = async () => {
  try {
    const testimonies = await Testimony.findAll();
    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.search = async (tag) => {
  try {
    const testimonies = await Testimony.findAll({
      where: {
        tags: {
          [Op.contains]: [tag],
        },
      },
    });

    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

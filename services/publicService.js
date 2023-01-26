const Testimony = require("../models/Testimony");
const { fn, col, Op } = require("sequelize");
const User = require("../models/User");

exports.getAllTestimonies = async () => {
  try {
    const testimonies = await Testimony.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
      where: {
        isApproved: true,
      },
      order: [["createdAt", "ASC"]],
    });
    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.getOneTestimony = async (testimonyID) => {
  try {
    const testimony = await Testimony.findOne({
      where: {
        id: testimonyID,
      },
      include: [
        {
          model: User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
    });
    return testimony;
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
      include: [
        {
          model: User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
    });

    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

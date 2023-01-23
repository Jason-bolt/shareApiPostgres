const Testimony = require("../models/Testimony");
const User = require("../models/User");

exports.createTestimony = async (testimonyPayload, userID) => {
  try {
    const { testimony, tags } = testimonyPayload;

    const newTestimony = await Testimony.create({
      testimony: testimony,
      tags: tags,
      UserId: userID,
    });

    return newTestimony;
  } catch (err) {
    return { error: err };
  }
};

exports.getUserTestimonies = async (userID) => {
  try {
    const testimonies = await Testimony.findAll({
      include: {
        model: User,
        where: {
          id: userID,
        },
      },
    });

    return testimonies;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

exports.updateTestimony = async (testimonyPayload, testimonyID) => {
  try {
    const { testimony, tags } = testimonyPayload;

    await Testimony.update(
      {
        testimony: testimony,
        tags: tags,
      },
      {
        where: {
          id: testimonyID,
        },
      }
    );
    return true;
  } catch (err) {
    return { error: err };
  }
};

exports.deleteTestimony = async (testimonyID) => {
  try {
    const testimony = await Testimony.findOne({
      where: {
        id: testimonyID,
      },
    });

    if (!testimony) {
      return { error: "Invalid testimony ID" };
    } else {
      await Testimony.destroy({
        where: {
          id: testimonyID,
        },
      });
      return true;
    }
  } catch (err) {
    return { error: err };
  }
};

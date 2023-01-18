const Testimony = require("../models/Testimony");

exports.createTestimony = async (testimonyPayload) => {
  try {
    const { testimony, tags } = testimonyPayload;

    const newTestimony = await Testimony.create({
      testimony: testimony,
      tags: tags,
    });

    return newTestimony;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

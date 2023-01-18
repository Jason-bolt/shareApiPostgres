const Testimony = require("../models/Testimony");

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

exports.updateTestimony = async (testimonyPayload, testimonyID) => {
  try {
    const { testimony, tags } = testimonyPayload;

    const updated = await Testimony.update(
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

    return updated;
  } catch (err) {
    return { error: err };
  }
};

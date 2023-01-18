const Testimony = require("../models/Testimony");

exports.createTestimony = async (testimonyPayload, userID) => {
  const { testimony, tags } = testimonyPayload;

  const newTestimony = await Testimony.create({
    testimony: testimony,
    tags: tags,
    UserId: userID,
  });

  return newTestimony;
};

// exports.updateTestimony = async (testimonyPayload, userID) => {
//     const { testimony, tags } = testimonyPayload;

//     await Testimony.update({
//       testimony: testimony,
//       tags: tags,
//     }, {
//         where: {
//             "id"
//         }
//     });

//     return true

// }

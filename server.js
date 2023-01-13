const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db");

const app = express();
const PORT = 3000 || process.env.PORT;

// Synchronize all tables
db.sync({ force: true })
  .then(() => {
    app.use(morgan("dev"));
    app.use(cors());

    app.listen(PORT, console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

// const testDbConnection = async () => {
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// testDbConnection();

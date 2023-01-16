const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const publicRoute = require("./routes/publicRoute");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000 || process.env.PORT;

// Synchronize all tables
db.sync()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan("dev"));
    app.use(cors());
    app.use("/testimonies", publicRoute);
    app.use("/user", userRoute);

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

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const publicRoute = require("./routes/publicRoute");
const userRoute = require("./routes/userRoute");
const testimonyRoute = require("./routes/testimonyRoute");
const adminRoute = require("./routes/adminRoute");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

// Synchronize all tables
db.sync()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(cookieParser());
    app.use(cors());
    app.use(morgan("dev"));
    app.use("/api/v1", publicRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/testimonies", testimonyRoute);
    app.use("/api/v1/admin", adminRoute);

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

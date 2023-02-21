const { Sequelize } = require("sequelize");

// const db_URI = process.env.DB_URI;
const db_name = process.env.DB;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

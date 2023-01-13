const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Testimony = sequelize.define(
  "Testimony",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    testimony: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY,
      allowNull: false,
    }
);

module.exports = Testimony;
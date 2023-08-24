const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const ForgotPassword = sequelize.define("Testimony", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

ForgotPassword.hasMany(User);
User.belongsTo(ForgotPassword);

module.exports = ForgotPassword;

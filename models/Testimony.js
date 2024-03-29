const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Testimony = sequelize.define("Testimony", {
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
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Testimony);
Testimony.belongsTo(User);

module.exports = Testimony;

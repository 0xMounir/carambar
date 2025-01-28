const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Joke = sequelize.define("Joke", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Joke;

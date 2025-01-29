const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Joke = sequelize.define("Joke", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Joke;

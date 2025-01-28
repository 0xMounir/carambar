const { dataTypes } = require("sequelize");
const { sequelize } = require("./index");

const joke = sequelize.define("Joke", {
  content: {
    type: dataTypes.STRING,
    allowNull: false,
  },
});

module.exports = joke;

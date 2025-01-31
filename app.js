const express = require("express");
const app = express();
const { sequelize } = require("./models");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const jokeRoutes = require("./routes/jokeRoutes.js");
const jokesData = require("./data/jokes.js");
const Joke = require("./models/joke");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Carambar",
      version: "2.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());
app.use("/v2/blagues", jokeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synchronized database");
  })
  .catch((err) => console.error("Error syncing database", err));

sequelize
  .authenticate()
  .then(() => console.log("Connected to SQLite database"))
  .catch((err) => console.error("Connection Error", err));

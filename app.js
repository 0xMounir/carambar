const express = require("express");
const app = express();
const { sequelize } = require("./models");
const Joke = require("./models/joke");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Carambar",
      version: "1.0.0",
    },
  },
  apis: ["app.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.sync().then(() => console.log("Synchronized database"));

app.post("/v1/blagues", async (req, res) => {
  try {
    const newJoke = await Joke.create(req.body);
    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/v1/blagues", async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/v1/blagues/:id", async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (!joke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/v1/blagues/random", async (req, res) => {
  try {
    const joke = await Joke.findOne({ order: [sequelize.fn("RANDOM")] });
    res.json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

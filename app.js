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
      version: "1.0.0",
    },
  },
  apis: ["app.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());
app.use("/v2/blagues", jokeRoutes);

const PORT = process.env.PORT || 5140;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.sync().then(async () => {
  console.log("Synchronized database");

  const existingJokes = await Joke.findAll();
  if (existingJokes.length === 0) {
    await Promise.all(
      jokesData.map(async (joke) => {
        const newJoke = await Joke.create({
          question: joke.question,
          answer: joke.answer,
        });
        console.log(`Added joke: ${newJoke.question} / ${newJoke.answer}`);
      })
    );
    console.log("Jokes added to db");
  } else {
    console.log("Jokes already exist in the database.");
  }
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to SQLite database"))
  .catch((err) => console.error("Connection Error", err));

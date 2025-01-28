const express = require("express");
const app = express();
const { sequelize } = require("./models");
const Joke = require("./models/joke");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

app.use(cors());

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

sequelize.sync().then(async () => {
  console.log("Synchronized database");

  const blagues = [
    { content: "Quelle est la femelle du hamster ? - L’Amsterdam" },
    { content: "Que dit un oignon quand il se cogne ? - Aïe" },
    {
      content:
        "Quel est l'animal le plus heureux ? - Le hibou, parce que sa femme est chouette.",
    },
    {
      content: "Pourquoi le football c'est rigolo ? - Parce que Thierry en rit",
    },
    {
      content:
        "Quel est le sport le plus fruité ? - La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
    },
    { content: "Que se fait un Schtroumpf quand il tombe ? - Un Bleu" },
    { content: "Quel est le comble pour un marin ? - Avoir le nez qui coule" },
    {
      content:
        "Qu'est ce que les enfants usent le plus à l'école ? - Le professeur",
    },
    { content: "Quel est le sport le plus silencieux ? - Le para-chuuuut" },
    {
      content:
        "Quel est le comble pour un joueur de bowling ? - C’est de perdre la boule",
    },
  ];

  await Promise.all(
    blagues.map(async (blague) => {
      const newJoke = await Joke.create(blague);
      console.log(`Added joke : ${newJoke.content}`);
    })
  );

  console.log("Jokes added to db");
});

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

app.get("/v1/blagues/random", async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json(randomJoke);
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

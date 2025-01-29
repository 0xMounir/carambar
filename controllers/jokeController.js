const Joke = require("../models/joke");

const addJoke = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: "Question & answer are required" });
    }
    const newJoke = await Joke.create({ question, answer });
    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRandomJoke = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json({
      question: randomJoke.question,
      answer: randomJoke.answer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getJokeId = async (req, res) => {
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
};

module.exports = {
  addJoke,
  getAllJokes,
  getRandomJoke,
  getJokeId,
};

const express = require("express");
const router = express.Router();
const {
  addJoke,
  getAllJokes,
  getRandomJoke,
  getJokeId,
} = require("../controllers/jokeController.js");

router.post("/", addJoke);

router.get("/", getAllJokes);

router.get("/random", getRandomJoke);

router.get("/:id", getJokeId);

module.exports = router;

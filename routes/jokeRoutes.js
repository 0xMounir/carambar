const express = require("express");
const router = express.Router();
const {
  addJoke,
  getAllJokes,
  getRandomJoke,
  getJokeId,
} = require("../controllers/jokeController.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - id
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: string
 *           description: The The auto-generated id of the question
 *         question:
 *           type: string
 *           description: The question
 *         answer:
 *           type: string
 *           description: The answer
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the joke was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the joke was updated
 *       example:
 *         id: 3
 *         question: Quel est l'animal le plus heureux ?
 *         answer: Le hibou, parce que sa femme est chouette.
 *         createdAt: 2025-01-29T18:31:39.837Z
 *         updatedAt: 2025-01-29T18:31:39.837Z
 */

/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: The Jokes managing API
 * /v2/blagues:
 *   post:
 *     summary: Create a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       200:
 *         description: The created joke.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Lists all the jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: The list of the jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *
 * /v2/blagues/{id}:
 *   get:
 *     summary: Get the joke by id
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The joke id
 *     responses:
 *       200:
 *         description: The joke response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: The joke was not found
 *
 * /v2/blagues/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Server error
 */

router.post("/", addJoke);

router.get("/", getAllJokes);

router.get("/random", getRandomJoke);

router.get("/:id", getJokeId);

module.exports = router;

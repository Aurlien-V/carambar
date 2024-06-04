const express = require('express');
const { getAllJokesHandler, getJokeByIdHandler, getRandomJokeHandler } = require('../controllers/jokeController');
const router = express.Router();

router.get('/jokes', getAllJokesHandler);
router.get('/jokes/:id', getJokeByIdHandler);
router.get('/jokes/random', getRandomJokeHandler);

module.exports = router;

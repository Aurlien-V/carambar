const { getAllJokes, getJokeById, getRandomJoke, addJoke } = require('../models/jokeModel');

const getAllJokesHandler = (req, res) => {
  getAllJokes((err, jokes) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(jokes);
  });
};

const getJokeByIdHandler = (req, res) => {
  const id = req.params.id;
  getJokeById(id, (err, joke) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    if (!joke) {
      return res.status(404).json({ error: 'Blague non trouvée' });
    }
    res.json(joke);
  });
};

const getRandomJokeHandler = (req, res) => {
  getRandomJoke((err, joke) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(joke);
  });
};

const addJokeHandler = (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Le contenu de la blague est requis' });
  }

  addJoke(content, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.status(201).json({ message: 'Blague ajoutée avec succès' });
  });
};

module.exports = { getAllJokesHandler, getJokeByIdHandler, getRandomJokeHandler, addJokeHandler };

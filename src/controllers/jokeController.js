const { getAllJokes, getJokeById, getRandomJoke } = require('../models/jokeModel');

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

module.exports = { getAllJokesHandler, getJokeByIdHandler, getRandomJokeHandler };

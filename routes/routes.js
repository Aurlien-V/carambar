const express = require('express');
const router = express.Router();
const controllerBlague = require('../controller/blague');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API in GET !' });
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API in POST !' });
})

router.get('/blague', controllerBlague.allBlague)

router.post('/blague', controllerBlague.create);

router.get('/blague!:id', controllerBlague.findById);

router.get('/blague/random', controllerBlague.random);

module.exports = router;

const express = require('express');
const controllerBlagues = require('../controllers');

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ success: 'RACINE API' });
});

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'test' });
});

router.get('/random',controllerBlagues.random );

router.get('/Blagues', controllerBlagues.findAll);
router.post('/Blagues', controllerBlagues.create);
router.get('/Blagues/:id', controllerBlagues.findById);

module.exports = router;

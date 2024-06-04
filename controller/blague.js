//const data = require('../models/data.json');
const Joke = require('../models/Joke');
const fs = require('fs');
const path = require('path');

const controllerBlague = {

    allBlague: async (req, res) => {
        const data = await Joke.findAll(); // Récupération de toutes les musiques dans la base de données
        res.status(200).json({ result: data });
    },

    findById: async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "Don't use text for id" });
        }
    
        const joke = await Joke.findByPk(id); // Recherche de la blague par son ID dans la base de données
    
        if (!joke) { // Remplacez "music" par "joke"
            return res.status(404).json({ error: "Joke not found" });
        }
    
        return res.status(200).json({ result: joke });
    },
    

    random: async (req, res) => {
        const data = await Joke.findAll()         //DB
        const length = data.length
        res.status(200).json({result : data[Math.floor(Math.random() * length)]})
    },

    create: async (req, res) => {
        try {
            const jokesData = req.body; // Récupérez les données des blagues depuis le corps de la requête
    
            // Créez les nouvelles instances de Joke avec les données fournies
            const createdJokes = await Joke.bulkCreate(jokesData);
    
            // Répondez avec succès et renvoyez les données des nouvelles blagues créées
            res.status(201).json({ success: 'Blagues créées avec succès', data: createdJokes });
        } catch (error) {
            // Gérez toute erreur qui pourrait survenir lors de la création des blagues
            res.status(500).json({ error: error.message });
        }
    },
    

}

module.exports = controllerBlague;
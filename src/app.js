const express = require('express');
const jokeRoutes = require('./routes/jokeRoutes');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database('jokes.db');

app.use(express.json());
app.use(cors());

// Initialisation de la base de données
const initializeDatabase = () => {
    const jokes = JSON.parse(fs.readFileSync('jokes.json', 'utf-8'));

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS jokes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)', (err) => {
            if (err) {
                return console.error(err.message);
            }
            const stmt = db.prepare('INSERT INTO jokes (content) VALUES (?)');
            jokes.forEach((joke) => {
                stmt.run(joke.content);
            });
            stmt.finalize();
        });
    });
};

// Initialiser la base de données
initializeDatabase();

app.use('/api/v1', jokeRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Fermeture de la connexion à la base de données.');
});

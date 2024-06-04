const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');

// Configuration de la base de données
const db = new sqlite3.Database('jokes.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Fonction d'initialisation de la base de données
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

app.use(`/api/v1`, router);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// Ne pas fermer la base de données immédiatement après l'initialisation
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Fermeture de la connexion à la base de données.');
// });

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('jokes.db');

const getAllJokes = (callback) => {
    db.all('SELECT * FROM jokes', [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

const getJokeById = (id, callback) => {
    db.get('SELECT * FROM jokes WHERE id = ?', [id], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

const getRandomJoke = (callback) => {
    db.get('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

module.exports = { getAllJokes, getJokeById, getRandomJoke };

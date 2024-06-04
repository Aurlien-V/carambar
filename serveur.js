const express = require('express');
const app = express();
const port = 3000;
const router = require('../carambar/src/routes/index');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');

// Configuration de la base de données
const db = new sqlite3.Database('../carambar/src/db/jokes.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



  app.use(`/api/${version}`, router);




db.sync().then(() => {
    console.log('DBConnect est synchronisé')
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  
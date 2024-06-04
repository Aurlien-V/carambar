const express = require('express');
const CORS = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = 3000;
const version = 'v1';
const router = require('./routes/routes');
const app = express();
const db = require('./db/dbconfig');

//Pour utilisé le json via d'autre domaine

app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${version}`, router);

// Middleware pour la documentation
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server started ...`);
    });
});
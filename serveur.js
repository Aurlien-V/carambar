const express = require("express");
const cors = require("cors");
const connexion = require("./db/dbconnect");
const app = express();
const port = 3000;
const version = "v1";
const router = require("./routes/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = require("./swagger.json");
const specs = swaggerJsdoc(options);
const Blague = require("./models/Blague");
const { SELECT } = require("sequelize/lib/query-types");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/examapi/${version}`, router);
app.use(
  `/examapi/${version}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

connexion.sync().then(() => {
  console.log("DBconnect est synchronisé");
  app.listen(port, () => {
    console.log("Example app listening on port ${port}");
  });
});
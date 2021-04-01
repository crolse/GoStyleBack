const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const app = express();
module.exports = app
;

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "GoStyle API" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/promotion.routes")(app);

// set port, listen for requests
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}.`);
});*/
http.createServer(app).listen(8080)
console.log("Listening port:%s ", 8080)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))



const db = require("./app/models");
db.sequelize.sync();

// delete and resynchronise tables if necessary
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/
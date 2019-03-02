//Dependencies
var express = require("express");
require('dotenv').config();

//Set up port for development or Heroku
var PORT = process.env.PORT || 8000;
var app = express();

//Require models
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set up parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
require("./routes/burger-api-routes.js")(app);
require("./routes/html-routes.js")(app);

//Set up db and start server listening
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        // eslint-disable-next-line no-console
        console.log("Listening on port: " + PORT);
    });
});

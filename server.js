// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressValidator = require('express-validator');
const exphbs = require("express-handlebars");
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
// Requiring our models for syncing
const db = require("./models");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;



app.use(passport.initialize()); //initializes the session
app.use(passport.session()); //tells passport to be in charge of the session

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(expressValidator());
// handle bars //
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Static directory
app.use(express.static("./public"));

// express session setting // 
app.use(session({
  secret: "user secret",
  cookie: {_expires: 10000000},
  resave: false,
  saveUninitialized: true
}));




// Routes =============================================================
require("./controllers/controller.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(()=> {
  app.listen(PORT, ()=> {
    console.log(`App listening on PORT  ${PORT}`);
  });
});

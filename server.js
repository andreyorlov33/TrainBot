// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressValidator = require('express-validator');
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
// Requiring our models for syncing
const db = require("./models");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;


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
app.use(cookieParser());
// express session setting // 

app.use(session({
  secret: "user secret",
  // store: new SequelizeStore({
  //   db: db.sequelize
  // }),
  cookie: {maxAge: 180*60*1000},
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize()); //initializes the session
app.use(passport.session()); //tells passport to be in charge of the session

// flash //
app.use(flash());

// Global VARS //
app.use( (request, response, next)=> {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error =request.flash('error');
  response.locals.user = request.user || null;
  next();
});


// Routes =============================================================
require("./controllers/controller.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(()=> {
  app.listen(PORT, ()=> {
    console.log(`App listening on PORT  ${PORT}`);
  });
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require('bcryptjs');
const path = require("path");


module.exports= (passport) => {
          passport.use('local-signIn', new LocalStrategy.Strategy(
        (username, password, done) => {
        db.User.findOne({ where: { 'username': username }}).then((user) => {
            if(!user){return done(null, false, {message:'Unknown User'})}
            let hashedPW = bcrypt.hashSync(password, user.salt) 
            if(user.password === hashedPW){
              return  done(null, user);
            }
            return done(null, false , { message: 'Incorrect password.'})
          })
        }
      ));

      // function that allowes rout access only to logged in users /// 
      function isLoggedIn(request, response, next){
          if(request.isAuthenticated()){
              return next();
          }
          response.redirect('/');
          
      }
    // function that allowes rout access only to logged in users /// 
          function notLoggedIn(request, response, next){
          if(!request.isAuthenticated()){
              return next();
          }
          response.redirect('/');
      }
        // Serialize Sessions
      passport.serializeUser((user, done) => {
        done(null, user);
      });

    //   Deserialize Sessions
      passport.deserializeUser((user, done) => {
        db.User.findOne({where: {'username': user.username}}).then((user) => {
          done(null, user);
        }).catch((err) => {
          done(err, null)
        });
      });
}








const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user.js')
const app = express();
const db = require("../models");
const bcrypt = require('bcryptjs');
const path = require("path");

module.exports = (app) => {

// landing page
    app.get('/', (request, response) => {
        db.Program.findAll({
        }).then((result) =>{
            var progObject = {
                programs: result
            };
            // console.log(progObject);
            response.render('landing', progObject);
        });
    });

// User page
    app.get('/user/workout', isLoggedIn, (request, response) =>{
        response.render('user-workout');
    });

    app.get('/user/profile', isLoggedIn, (request, response) =>{
        response.render('user-profile');
    })

// Client List
    app.get('/admin/clients', isLoggedIn, (request, response) => {
        db.User.findAll({
            attributes: ['name', 'username', 'email'],
            include: {
                model: db.Program,
                attributes: ['name', 'description']
            }
        }).then((result) =>{
            var clientList = {
                clients: result
            };
            response.render('clientList', clientList);
        });
    });

// Create Program page

    app.get('/admin/create', isLoggedIn,  (request, response) => {
        response.render('admin-create');
    });

// Form page for NEW WORKOUT
    app.get('/admin/workout',  isLoggedIn,  (request, response) => {
        db.Program.findAll({
        }).then((result) =>{
            var progList = {
                programs: result
            };
            response.render('newWorkout', progList);
        });
    });
    
    app.post('/admin/workout/new',  isLoggedIn, (request, response) => {
        console.log(request.body);
        db.WorkoutDay.create({
            day: request.body.day,
            text: request.body.text,
            ProgramId: request.body.program
        }).then((dbWorkOut) => {
            console.log(dbWorkOut);
        });
        response.redirect('/admin/workout');
    });

// Form Page to UPDATE WORKOUT
    app.get('/admin/workout/update',  isLoggedIn,  (request, response) =>{
        response.render('admin/workout/update');
    });



// List of all programs
    app.get('/admin/programs',  isLoggedIn,  (request, response) => {
        db.Program.findAll({
        }).then((result) =>{
            var progObject = {
                programs: result
            };
            console.log(progObject);
            response.render('programs', progObject);
        });
    });

    app.post('admin/programs',  isLoggedIn,  (request, response) =>{
        db.Program.create({
            name: request.body.name,
            days: request.body.days,
            description: request.body.description
        }).then((dbProgram)=>{
            response.json(dbProgram);
        });
    });


// List of workouts for individual program
    // app.get('/admin/programs/:id', (request, response) => {
    //     db.Program.findOne({
    //         where: {
    //             id: request.params.id
    //         },
    //         attributes: ['id', 'name'],
    //         include: {
    //             model: db.WorkoutDay,
    //             attributes: ['day', 'text']    
    //         }
    //     }).then((results) =>{
    //         var progDetails = {
    //             details: results
    //         };
    //         console.log(progDetails);
    //         response.render('details', progDetails)
    //     })
    // });

    app.get('/admin/programs/:id', (request, response) => {
        db.Program.findOne({
            where: {
                id: request.params.id
            },
            attributes: ['id', 'name'],
            include: {
                model: db.WorkoutDay,
                attributes: ['day', 'text']    
            }
        }).then((results) =>{
 
            response.json(results);
        })
    });

// Form page for Client Program UPDATE
    app.get('/admin/clients/update', (request, response) => {
        db.User.findAll({   
        }).then((result) =>{
            var userObject = {
                user: result
            };
            console.log(userObject);
            response.render('clientUpdate', userObject);
        });
    });
    app.put('/admin/clients/update:id', (request, response) => {
        console.log(request.body);
        db.User.update({
            ProgramId: request.body.program
        },{
            where: {id: request.params.id}
        }).then(() => {
            response.redirect('/admin/clients/update');
        });  
    });




    // User Registration routes    
    app.post('/users/register', (request, response) => {
         let name = request.body.username; 
         let username = request.body.username;
         let email = request.body.email;
         let password = request.body.password;
         let password2 = request.body.password2;
         
          request.checkBody('name', 'Name is required').notEmpty();
          request.checkBody('email', 'Email is required').notEmpty();
          request.checkBody('email', 'Email is not valid').isEmail();
          request.checkBody('username', 'username is required').notEmpty()
          request.checkBody('password', 'Password is required').notEmpty()
          request.checkBody('password2', 'Passwords do not match').equals(request.body.password);
             
              let errors = request.validationErrors();
              if(errors){
                  response.redirect('/', {errors: errors});
              } else {
                
                 let salt = bcrypt.genSaltSync(10)
                 let hashedPassword = bcrypt.hashSync(password, salt) 
                 db.User.create({
                     name: name,
                     username: username,
                     password: hashedPassword,
                     salt: salt,
                     email: email
                 }).then(
                    ()=>{
                        console.log("User Registered")
                        response.redirect('/');
                    }
             )}
     })



      passport.use(new LocalStrategy.Strategy(
        (username, password, done) => {
        db.User.findOne({ where: { 'username': username }}).then((user) => {
            let hashedPW = bcrypt.hashSync(password, user.salt) 
            if(user.password === hashedPW){
              return  done(null, user);
            }
            return done(null, false , console.log('incorrect password'))
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
          console.log("-user object being serialized ---->" + user)
        done(null, user);
      });

    //   Deserialize Sessions
      passport.deserializeUser((user, done) => {
        db.User.findOne({where: {'username': user.username}}).then( (user) => {
          done(null, user);
        }).catch((err) => {
          done(err, null)
        });
      });



        app.post('/login', passport.authenticate('local', 
          {  successRedirect: '/user/workout',
            failureRedirect: '/signup'}
        ));

        app.post('/login/admin', passport.authenticate('local', 
          {  successRedirect: '/admin/clients',
            failureRedirect: '/signup'}
        ));

        app.get('/logout', isLoggedIn, (request, response, next) => {
            request.logout();
            response.redirect('/');
        })
};
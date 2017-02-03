const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
    app.get('/user/workout', isLoggedIn, (request, response) => {
        db.WorkoutDay.findOne({
            where: {
                day: request.user.currentDay,
                ProgramId: request.user.ProgramId
            },
            include: {
                model: db.Program,
                attributes: ['name']
            }
        }).then((results) => {
            var workoutObject = {
                singleWorkout: results
            };
            response.render('user-workout', workoutObject);
        });
    });

<<<<<<< HEAD
    app.get('/user/profile', isLoggedIn, (request, response) =>{
        response.render('user-profile');
    })
=======
    app.put('/user/workout', isLoggedIn, (request, response) => {
        db.User.update(
            request.body,
        {
            where: {id: request.user.id}
        }).then((result) => {
            response.json(result);
        });
    });

    app.get('/user/profile', isLoggedIn, (request, response) => {
        db.User.findOne({
            where: {
                id: request.user.id
            },
            attributes: ['name', 'username', 'email', 'password', 'currentDay'],
            include: {
                model: db.Program,
                attritbues: ['name', 'days']
            }
        }).then((result) => {
            var userInfo = {
                info: result
            };
            console.log(result);
            response.render('user-profile', userInfo);
        });
    });

    app.put('/user/profile', isLoggedIn, (request, response) => {
        db.User.update({
            name: request.body.name,
            username: request.body.username,
            email:request.body.email
        },{
            where: {id: request.user.id}
        }).then((result) => {
            response.redirect('/user/profile');
        })
    });
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d

// Client List
    app.get('/admin/clients', isLoggedIn, (request, response) => {
        db.User.findAll({
            attributes: ['id', 'name', 'username', 'email', 'currentDay'],
            include: {
                model: db.Program,
                attributes: ['name', 'description', 'days']
            }
        }).then((result) =>{
            var percentArray = [];
            for (var i = 0; i < result.length; i++){
                var currentDay = result[i].dataValues.currentDay;
                var day = result[i].dataValues.Program.dataValues.days;
                var percent = (currentDay / day) * 100;
                percentArray.push(percent);
            }

            var percentObject = {
                percent: percentArray
            }

            var clientList = {
                clients: result,
                percents: percentObject
            };

            response.render('admin-client', clientList);
        });
    });

<<<<<<< HEAD
// Create Program page

    app.get('/admin/create', isLoggedIn,  (request, response) => {
=======
// New program page
    app.get('/admin/create', (request, response) => {
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
        response.render('admin-create');
    });

// Creates new program
    app.post('/admin/create', (request, response) => {
        db.Program.create(
            request.body
        ).then( (dbPost) => {
            response.json(dbPost);
        });
    });

// Form page for NEW WORKOUT
<<<<<<< HEAD
    app.get('/admin/workout',  isLoggedIn,  (request, response) => {
=======
    app.get('/admin/create/workout', (request, response) => {
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
        db.Program.findAll({
        }).then((result) =>{
            var progList = {
                programs: result
            };
            response.render('admin-new-workout', progList);
        });
    });
    
<<<<<<< HEAD
    app.post('/admin/workout/new',  isLoggedIn, (request, response) => {
=======
// Create new workout
    app.post('/admin/create/workout', (request, response) => {
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
        console.log(request.body);
        db.WorkoutDay.create({
            day: request.body.day,
            text: request.body.text,
            ProgramId: request.body.program
        }).then((dbWorkOut) => {
            console.log(dbWorkOut);
            response.render('admin-new-workout');
        });
        
    });

// Form Page to UPDATE WORKOUT
    app.get('/admin/workout/update',  isLoggedIn,  (request, response) =>{
        response.render('admin/workout/update');
    });



<<<<<<< HEAD
// List of all programs
    app.get('/admin/programs',  isLoggedIn,  (request, response) => {
=======
// gets all of the programs
    app.get('/admin/programs', (request, response) => {
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
        db.Program.findAll({
        }).then((result) =>{
            var progObject = {
                programs: result
            };
            console.log(progObject);
            response.render('programs', progObject);
        });
    });

<<<<<<< HEAD
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
=======
// creates new program
    // app.post('admin/programs', (request, response) =>{
    //     db.Program.create({
    //         name: request.body.name,
    //         days: request.body.days,
    //         description: request.body.description
    //     }).then((dbProgram)=>{
    //         response.json(dbProgram);
    //     });
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
    // });

// gets the individual workout program
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
        });
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

    
        app.post('/login', passport.authenticate('local-signIn', 
          {  successRedirect: '/user/workout',
            failureRedirect: '/',
            failureFlash: true
        }
        ));

        app.post('/login/admin', passport.authenticate('local-signIn', 
          {  successRedirect: '/admin/clients',
            failureRedirect: '/',
            failureFlash: true}
        ));

        app.get('/logout', isLoggedIn, (request, response, next) => {
            request.logout();
            request.flash('success_msg', "You are logged out");
            response.redirect('/');
        })


    // User Registration routes    
    app.post('/users/register', (request, response) => {
         let name = request.body.name; 
         let username = request.body.username;
         let email = request.body.email;
         let password = request.body.password;
         let password2 = request.body.password2;
         let program = request.body.workouts;
         
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
                     email: email,
                     ProgramId: program
                 }).then(
                    (user)=>{
                       passport.authenticate("local-signIn", {failureRedirect:"/signup", successRedirect: "/user/profile"})(request, response) 
                       request.flash('success_msg', 'You are registered and can now login');
                     }
             )}
     });

// ******************************************************************************
// *************************** PASSPORT CONFIG***********************************
// ******************************************************************************

      passport.use('local-signIn', new LocalStrategy.Strategy(
        (username, password, done) => {
        db.User.findOne({ where: { 'username': username }}).then((user) => {
<<<<<<< HEAD
=======
            if(!user){return done(null, false, {message:'Unknown User'})}
>>>>>>> 451709711033c5dfce40d48a3a98759ecdcc006d
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



};
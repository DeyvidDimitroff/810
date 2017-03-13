 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var bcrypt = require('bcryptjs');

 var User = require('../db/models/user');


 passport.use(new LocalStrategy(
   function (username, password, done) {
     User.getUserByUsername(username, function (err, user) {
       if (err) {
         return done(err);
       }
       if (!user) {
         return done(new Error("Unknown user"));
       }

       bcrypt.compare(password, user.password, function (err, doesMatch) {
         if (err) {
           return done(err);
         }
         if (!doesMatch) {
           return done(new Error("Wrong password"));
         }
         done(null, user);
       });
     });
   }));

 passport.serializeUser(function (user, done) {
   done(null, user.username);
 });

 passport.deserializeUser(function (username, done) {
   User.getUserByUsername(username, done);
 });

 module.exports.middleware = passport.authenticate('local', {
   successRedirect: '/users/landingPage',
   failureRedirect: '/'
 });
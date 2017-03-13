var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configureEndPoints = require('./endpoints');
var handlebars = require('express-handlebars');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var path = require('path');


module.exports = function (app) {
  app.engine('handlebars', handlebars({
    defaultLayout: 'layout',
    helpers: {
      isTeacher: isTeacher
    }
  }));
  app.set('view engine', 'handlebars');

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, '..', '..', 'front-end', 'static')));

  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  configureEndPoints(app);
};

function isTeacher(user, options) {
  if (user.role === 'teacher') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
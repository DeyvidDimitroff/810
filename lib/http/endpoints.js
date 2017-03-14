var passportUtils = require('./passport');
var User = require('../db/models/user');
var Course = require('../db/models/course');


module.exports = function (app) {
  app.get('/', function (req, res) {
    User.getTeachers(function (err, teachers) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      res.render('home', {
        teachers: teachers
      });
    });
  });

  app.get('/users/course', function (req, res) {
    Course.getByTeacherUsername(req.user.username, function (err, course) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      res.render('course', {
        user: req.user,
        course: course
      });
    });
  });

  app.post('/users/update', function (req, res) {
    var cou = {
      title: req.body.title,
      description: req.body.description
    };

    Course.updateOne({
      "teacherUsername": req.user.username
    }, {
      $set: cou
    }, function (err, result) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      res.redirect('/users/profile/' + req.user.username);
    });
  });


  app.get('/users/register', function (req, res) {
    res.render('register');
  });

  app.post('/users/register', function (req, res) {
    var data = req.body;

    var newUser = new User(data);

    User.createUser(newUser, function (err, user) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      if (user.role === 'teacher') {
        var newCourse = new Course({
          teacherUsername: user.username,
          title: '',
          description: ''
        });
        Course.createCourse(newCourse, function (err) {
          if (err) {
            res.render('error', {
              status: 500,
              message: err.message
            });
            return;
          }
          res.redirect('/');
        });
      } else {
        res.redirect('/');
      }
    });
  });

  app.get('/users/landingPage', function (req, res) {
    User.getTeachers(function (err, teachers) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      res.render('home', {
        teachers: teachers,
        user: req.user
      });
    });
  });

  app.get('/users/profile/:username', function (req, res) {
    var username = req.params.username;
    User.getUserByUsername(username, function (err, user) {
      if (err) {
        res.render('error', {
          status: 500,
          message: err.message
        });
        return;
      }
      Course.getByTeacherUsername(username, function (err, course) {
        if (err) {
          res.render('error', {
            status: 500,
            message: err.message
          });
          return;
        }
        user.course = course;
        res.render("profile", {
          targetUser: user,
          user: req.user
        });
      });
    });

  });

  app.post('/users/login', passportUtils.middleware);

  app.get('/users/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
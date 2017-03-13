var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  role: {
    type: String,
    default: 'student'
  },
  competences: {
    type: Array,
    default: []
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        return callback(err);
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
};

module.exports.getTeachers = function (callback) {
  var query = {
    role: 'teacher'
  };
  User.find(query, callback);
};
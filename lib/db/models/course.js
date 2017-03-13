var mongoose = require('mongoose');

var CourseSchema = mongoose.Schema({
  teacherUsername: {
    type: String,
    index: {
      unique: true
    }
  },
  title: {
    type: String
  },
  description: {
    type: String
  }
});

var Course = module.exports = mongoose.model('Course', CourseSchema);

module.exports.update = function (teacherUsername, updated, callback) {
  Course.updateOne({
    teacherUsername: teacherUsername
  }, {
    $set: updated
  }, function (err, result) {
    if (err) {
      return callback(err);
    }
    console.log('Course updated');
  });
};

module.exports.getByTeacherUsername = function (teacherUsername, callback) {
  var query = {
    teacherUsername: teacherUsername
  };
  Course.findOne(query, callback);
};
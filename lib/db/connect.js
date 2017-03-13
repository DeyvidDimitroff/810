var mongoose = require('mongoose');

module.exports = function (dbConfig) {
    var uri = 'mongodb://' + dbConfig.host;
    if (dbConfig.port) {
        uri += ':' + dbConfig.port;
    }
    uri += '/' + dbConfig.database;
    console.log("Connecting to db at " + uri);
    mongoose.connect(uri);
};
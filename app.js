var express = require('express');
var http = require('http');
var dbConnect = require('./lib/db/connect');
var enableChat = require('./lib/web-sockets/chat');
var configureHttp = require('./lib/http/configure');

var appConfig = require('./app-config.json');
dbConnect(appConfig.db);

var app = express();
var server = http.createServer(app);
enableChat(server);
configureHttp(app);

server.listen(appConfig.httpPort, function () {
  console.log("Application started..");
});
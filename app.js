var express = require('express');
var app = express();
var exec = require('child_process').exec;
var config = require('config');
var os = require("os");
var fs = require("fs");
var morgan = require('morgan');

// Apache style log output
morgan.format('sfcustom', '{"logType":"access_log","remoteAddr":":remote-addr","XForwardedFor":":req[XForwardedFor]","timestamp":"[:date[clf]]","requestTime":":response-time","requestMethod":":method", "requestURI":":url","requestProtocol":"HTTP/:http-version","status":":status","size":":res[content-length]","referrer":":referrer","userAgent":":user-agent"}');
app.use(morgan('sfcustom'));


app.get('/', function (req, res) {
  var foo = "<h1>Hello World!</h1><p>\nHost: " + os.hostname() + "<p>\nUser ip:" + req.connection.remoteAddress + "\n";
  res.send(foo);
});

app.get('/ping', function (req, res) {
  var result = "OK - branch=" + process.env.BRANCH + " hostname=" + os.hostname() + " - " + process.env.SF_ENV + "\n";
  res.send(result);
});

var server = app.listen(10001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});

#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('api:server');
var http = require('http');
var Constants = require('./constants');
var classLoader = require('./Services/ClassLoader');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);
app.set('stink', 'Azlan')

/**
 * Get Command Line Arguments for app.
 */
var CLIEnumerable = {
  "T" : "Test",
  "SI" : "SpotifyFileInfoPath"
}
var CLArgs = parseCommmandLineArgs()
Constants.setConstants(CLArgs)

/**
 * Initialize all required Data class instances.
 */
classLoader.Initialize();

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Commandline Argument parsing logic.
 */

function parseCommmandLineArgs() {
  var cliArgs = process.argv.slice(2);
  var cliArgsObject = {}
  for(var x = 0; x < cliArgs.length; x+=2){
    var key = getArgKey(cliArgs[x]);
    if(key != null){
      var value = cliArgs[x+1]
      cliArgsObject[key] = value;
    }
  }
  return cliArgsObject;
}

function getArgKey(cliKeyEntry){
  var keyBase = cliKeyEntry.slice(1);
  var keyName = CLIEnumerable[keyBase];
  if(keyName == null){
    console.log(`Key ${keyBase} not implemented.`);
    return keyName;
  }
  else{
    return keyName;
  }
}


"use strict";

var fs 			= require('fs');
var winston 	= require('winston');			//https://www.npmjs.org/package/winston
var LogstashUDP = require('winston-logstash-udp').LogstashUDP;

var config  = require('config');
var logConfig = config.get('output');

var logPath = './logs/';
if(!fs.existsSync(logPath))
    fs.mkdirSync(logPath)  //TODO: 'mode' argument can be defined, currently mode = 0777 permissions

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
          timestamp : true,
    	  level 	: logConfig.stdout.level,
    	  json		: false,
    	  colorize	: true}),

     new(LogstashUDP)({
          port: logConfig.logstash.port,
          appName: logConfig.logstash.appName,
          host: logConfig.logstash.host}),

      new (winston.transports.File)({
    	  //filename 	: process.cwd() + '/logs/' + logConfig.logFile.name,
          filename 	: logPath + logConfig.logFile.name,
    	  level		: logConfig.logFile.level,
          timestamp : true,
    	  maxsize 	: 1024 * 1024 * logConfig.logFile.maxSizeMB,	//X Mega
    	  maxFiles 	: logConfig.logFile.maxFiles,
    	  json		: false,
    	  logstash	: false } )
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

/*
Logging Levels:

'silly'
'debug'
'verbose'
'info'
'warn'
'error'
*/

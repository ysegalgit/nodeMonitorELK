"use strict";

var config  = require('config');
var util    = require('util');
var pjson   = require('./package.json');
var cpuMonitor  = require('./lib/monitors/cpuMonitor.js');
var memMonitor  = require('./lib/monitors/memMonitor.js');
var diskMonitor = require('./lib/monitors/diskMonitor.js');

var timeIntervalMsec = config.get('timeIntervalMsec');

cl(util.format("**************** starting %s v%s ****************", pjson.name, pjson.version));
cl(util.format("NODE_ENV = %s", process.env.NODE_ENV));
cl("\n");

cpuMonitor.monitor(timeIntervalMsec.cpu);
memMonitor.monitor(timeIntervalMsec.memory);
diskMonitor.monitor(timeIntervalMsec.disk);



function cl(text){
  console.log(text);
}

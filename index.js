"use strict";

var config  = require('config');
var cpuMonitor = require('./lib/monitors/cpuMonitor.js');
var memMonitor = require('./lib/monitors/memMonitor.js');

var timeIntervalMsec = config.get('timeIntervalMsec');

//cl(cpuMonitor.getSnapshot());
cpuMonitor.monitor(timeIntervalMsec.cpu);
memMonitor.monitor(timeIntervalMsec.memory);



function cl(text){
  console.log(text);
}

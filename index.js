"use strict";

var config  = require('config');
var cpuMonitor = require('./lib/monitors/cpuMonitor.js');
var memMonitor = require('./lib/monitors/memMonitor.js');
var diskMonitor = require('./lib/monitors/diskMonitor.js');

var timeIntervalMsec = config.get('timeIntervalMsec');

cpuMonitor.monitor(timeIntervalMsec.cpu);
memMonitor.monitor(timeIntervalMsec.memory);
diskMonitor.monitor(timeIntervalMsec.disk);



function cl(text){
  console.log(text);
}

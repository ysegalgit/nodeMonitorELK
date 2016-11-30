"use strict";
//
var os      = require('os');
var config  = require('config');
var logger 	= require('../utils/logger.js');

module.exports = {

    getSnapshot : function(){
        var res = {};
        res.numOfCores = getNumOfCores();
        res.coresType = getCoresType();
        res.coresSpeed = getCoresSpeed();
        res.loadOverage = getLoadAvg();

        return res;
    },

    monitor : function(interval){
        var self = this;    //ys - to have the 'this' content inside the 'setInterval' function. otherwise, out of scope.
         setInterval(function() {
            var cpuInfo = self.getSnapshot();
            cl(cpuInfo);
            logger.info(cpuInfo);
         }, interval);
    }

}

function getNumOfCores(){
  return os.cpus().length;
}

function getCoresType(){
  return os.cpus()[0].model;
}

function getCoresSpeed(){
  return os.cpus()[0].speed;
}

function getLoadAvg(){
  //The load average is a measure of system activity, calculated by the operating system and expressed as a fractional number.
  //As a rule of thumb, the load average should ideally be less than the number of logical CPUs in the syste
  return os.loadavg();
}


function cl(text){
  console.log(text);
}

"use strict";

var os      = require('os');
//var config  = require('config');
var logger 	= require('../utils/logger.js');

module.exports = {

	getSnapshot : function(){
		var res = {};
		res.totalMemoryBytes        = getTotalMemory();
		res.totalMemoryMB           = Math.floor(res.totalMemoryBytes / 1024 / 1024);
        //res.freeMemoryBytes         = getFreeMemory();
		res.memInUseBytes           = res.totalMemoryBytes - getFreeMemory();
        //res.freeMemoryMB            = Math.floor(res.freeMemoryBytes / 1024 / 1024);
		res.memInUseMB              = Math.floor(res.memInUseBytes / 1024 / 1024);
		res.memInUsePercentage      = Math.floor(res.memInUseBytes / res.totalMemoryBytes * 100);

		return res;
	},

	monitor : function(interval){
		var self = this;    //ys - to have the 'this' content inside the 'setInterval' function. otherwise, out of scope.
		setInterval(function(){
			var memInfo = self.getSnapshot();
			logger.info(memInfo);
		}, interval);
	}

};

function getFreeMemory(){
	return os.freemem();
}

function getTotalMemory(){
	return os.totalmem();
}


function cl(text){
	console.log(text);
}

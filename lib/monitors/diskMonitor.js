"use strict";

var diskspace   = require('diskspace');
var config      = require('config');
var logger 	    = require('../utils/logger.js');

var snapshot = {};

module.exports = {

    getSnapshot : function(){
        var res = {};
        res.totalDiskSpaceBytes     = snapshot.total;
        res.totalDiskSpaceMB        = Math.floor(res.totalDiskSpaceBytes / 1024 / 1024);
        res.freeDiskSpaceBytes      = snapshot.free;
        res.freeDiskSpaceMB         = Math.floor(res.freeDiskSpaceBytes / 1024 / 1024);
        res.diskInUsePercentage     = Math.floor((res.totalDiskSpaceBytes - res.freeDiskSpaceBytes) / res.totalDiskSpaceBytes * 100);
        res.status                  = snapshot.status;

        return res;
    },

    monitor : function(interval){
        var self = this;    //ys - to have the 'this' content inside the 'setInterval' function. otherwise, out of scope.
         setInterval(function() {
             var diskspace = require('diskspace');
             //diskspace.check('C', function (err, total, free, status)     // for windows
             diskspace.check('/', function (err, total, free, status)       // '/' for linux
             {
                 snapshot.err       = err;
                 snapshot.total     = total;
                 snapshot.free      = free;
                 snapshot.status    = status;
             });
            logger.info(self.getSnapshot());
         }, interval);
    }

}


function cl(text){
  console.log(text);
}

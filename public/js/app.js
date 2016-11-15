'use strict';

var app = angular.module('airlyApp', []);

app.controller('shopControl', function(){
  var self = this;

  self.STATUS = {
    "OFF": 1,
    "CHARGING": 2,
    "READY": 3,
    "DELIVERING": 4,
    "RETURNING": 5
  };

  self.drones = [
    {
      "status": self.STATUS.OFF,
      "gps": "62.28329, 39.292"
    },
    {
      "status": self.STATUS.DELIVERING,
      "gps": "62.28329, 42.592"
    }
  ];
});

'use strict';

angular.module('airlyApp', ['ngGeolocation'])

.controller('shopControl', ['$scope', '$http', '$interval', '$geolocation', function($scope, $http, $interval){
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

  $interval(function(){
    $http.get('/dronestatus')
    .then(function(res){
      self.drones = res.data;
    }, function(err){
      console.log(err);
    });
  }, 1000);

}])

.controller('droneControl', ['$scope', '$geolocation', '$interval', '$http', function($scope, $geolocation, $interval, $http){

  var self = this;

  self.positionData = {"data": true};

  function update(position){
    console.log(position);
    self.positionData.position = {lat: position.coords.latitude, lon: position.coords.longitude};
    $geolocation.getCurrentPosition({
      timeout: 60000
    }).then(update);


    $http.post('/droneposition', self.positionData)
    .then(function(res){
      console.log(res);
    }, function(err){
      console.log("position update failed! " + err);
    });
  }

  $geolocation.getCurrentPosition({
      timeout: 60000
   }).then(update);

}]);

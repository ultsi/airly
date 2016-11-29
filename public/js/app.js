'use strict';

var DRONE_STATUS = {
    "OFF": 1,
    "CHARGING": 2,
    "READY": 3,
    "DELIVERING": 4,
    "RETURNING": 5
  };

angular.module('airlyApp', ['ngGeolocation'])


.controller('shopControl', ['$scope', '$http', '$interval', '$geolocation', function($scope, $http, $interval){
  var self = this;

  self.drones = {};

  $interval(function(){
    $http.get('/dronestatus')
    .then(function(res){
      self.drones = res.data;
    }, function(err){
      console.log(err);
    });
  }, 1000);

}])

.controller('droneControl', ['$scope', '$geolocation', '$timeout', '$http', function($scope, $geolocation, $timeout, $http){

  var self = this;

  self.properties = {name: 'Asd', status: DRONE_STATUS.OFF, position: {}};

  function update2() {
    console.log("updated?");
    if (!window.navigator.geolocation) {
      console.log('Geolocation not supported.');
    } else {
        window.navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
                $scope.position = {lat: position.coords.latitude, lon: position.coords.longitude};

                self.properties.position = $scope.position;
                $http.post('/droneposition', self.properties)
                .then(function(res){
                  console.log(res);
                }, function(err){
                  console.log("position update failed! " + err);
                });

                $timeout(update2, 2000);
            },
            function (err) {
                console.log(err);
                $timeout(update2, 2000);
            });
    }
  }
  update2();

}]);

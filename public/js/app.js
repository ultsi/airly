'use strict';

var DRONE_STATUS = {
    "OFF": 1,
    "CHARGING": 2,
    "READY": 3,
    "DELIVERING": 4,
    "RETURNING": 5
  };

angular.module('airlyApp', ['uiGmapgoogle-maps'])

.controller('shopControl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
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

.controller('droneControl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http){
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
                $scope.position = {lat: position.coords.latitude, lng: position.coords.longitude};

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

}])

.controller('userControl',['$scope', '$http', '$timeout', 'uiGmapGoogleMapApi', function($scope, $http, $timeout, uiGmapGoogleMapApi){
  var self = this;
  var droneImage = 'https://cdn2.iconfinder.com/data/icons/crystalproject/Open-Office-Icons/stock_draw-circle-16.png';
  self.drones = {};
  $scope.map = {
    center: {latitude: 60.10, longitude: 25.0},
    zoom: 6,
    events: {
      tilesloaded: function (map) {
          $scope.$apply(function () {
            self.mapInst = map;
          });
      }
    }
  };

  function update2() {
    console.log("updated?");
    if (!window.navigator.geolocation) {
      console.log('Geolocation not supported.');
    } else {
        window.navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);

                $scope.position = {lat: position.coords.latitude, lng: position.coords.longitude};

                uiGmapGoogleMapApi.then(
                  function(inst){
                    self.mapInst.setCenter($scope.position);
                    $http.get('/dronestatus')
                    .then(function(res){
                      for(name in res.data){
                        if(!self.drones[name]){
                          self.drones[name] = res.data[name];
                        } else {
                          self.drones[name].position = res.data[name].position;
                        }
                        var drone = self.drones[name];
                        if(!drone.marker){
                          console.log("New marker!");
                          drone.marker = new inst.Marker({
                            position: drone.position,
                            map: self.mapInst,
                            icon: droneImage
                          });
                        } else {
                          console.log("Old marker!");
                          drone.marker.setPosition(drone.position);
                        }
                      }
                    }, function(err){
                      console.log(err);
                    });
                  }
                );


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

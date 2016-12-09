'use strict';

var DRONE_STATUS = {
  "AVAILABLE": 1,
  "LOADING": 2,
  "DELIVERING": 3,
  "RETURNING": 4
};

var DELIVERY_STATUS = {
  PENDING: 1,
  ACCEPTED: 2,
  DELIVERED: 3
};

var LANDING_ZONES = {
  kanditalo: {
    center: {
      lat: 60.186295,
      lng: 24.828423
    },
    radius: 1
  }
}

function drawDrone(drone, mapInst, gmapInst) {
  var droneImage = 'drone2.png';
  if (!drone.marker) {
    drone.marker = new gmapInst.Marker({
      position: drone.position,
      map: mapInst,
      icon: droneImage
    });
    drone.infoWindow = new gmapInst.InfoWindow({
      content: "<h1>" + drone.name + "</h1><p>" + drone.status + "</p>"
    });
    drone.marker.addListener('click', function () {
      drone.infoWindow.open(mapInst, drone.marker);
    });
  }
  else {
    drone.marker.setPosition(drone.position);
    drone.infoWindow.setContent("<h1>" + drone.name + "</h1><p>" + getStatusText(drone.status) + "</p>");
  }
}

function getStatusText(statusId) {
  switch (statusId) {
  case DRONE_STATUS.AVAILABLE:
    return "AVAILABLE";
  case DRONE_STATUS.LOADING:
    return "LOADING";
  case DRONE_STATUS.DELIVERING:
    return "DELIVERING";
  case DRONE_STATUS.RETURNING:
    return "RETURNING";
  default:
    return "UNKNOWN";
  }
}

angular.module('airlyApp', ['uiGmapgoogle-maps'])

.controller('shopControl', ['$scope', '$http', '$timeout', 'uiGmapGoogleMapApi', function ($scope, $http, $timeout, uiGmapGoogleMapApi) {
  var self = this;

  self.drones = {};
  $scope.map = {
    center: {
      latitude: 60.183333,
      longitude: 24.833333
    },
    zoom: 15,
    events: {
      tilesloaded: function (map) {
        $scope.$apply(function () {
          self.mapInst = map;
        });
      }
    }
  };

  $scope.currentDroneStatus = DRONE_STATUS.AVAILABLE;

  function update2() {

    uiGmapGoogleMapApi.then(
      function (gmapInst) {
        $http.get('/dronestatus')
          .then(function (res) {
            for (var name in res.data) {
              if (!self.drones[name]) {
                self.drones[name] = res.data[name];
              }
              if (self.drones[name].status === DRONE_STATUS.DELIVERING) {
                console.log("Should be drawing");
                $scope.currentDroneStatus = DRONE_STATUS.DELIVERING;
                drawDrone(self.drones[name], self.mapInst, gmapInst);
              }
            }
            $timeout(update2, 2000);
          }, function (err) {
            console.log(err);
            $timeout(update2, 2000);
          });
      }
    );

  }
  update2();
}])

.controller('droneControl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
  var self = this;
  var updateTimeout = 2000;
  self.error = "";
  self.properties = {
    droneId: 0,
    name: 'Dr. One',
    status: DRONE_STATUS.AVAILABLE,
    position: {},
    deliveryId: null
  };
  self.open_deliveries = [];

  self.getStatusText = getStatusText(self.properties.status);

  self.pickDelivery = function (deliveryId) {
    $http.post('/drones/accept', {
        deliveryId: deliveryId
      })
      .then(function () {}, function (err) {
        console.log("Accept delivery failed!" + err);
        self.error = err;
      });
    $http.post('/delivery/accept', {
        deliveryId: deliveryId
      })
      .then(function () {}, function (err) {
        console.log("Accept drones failed!" + err);
        self.error = err;
      });
  };

  function fetchOpenDeliveries() {
    $http.get('/delivery/open')
      .then(
        function (res) {
          $timeout(fetchOpenDeliveries, updateTimeout);
          //console.log(res.data);
          self.open_deliveries = res.data;
        },
        function (err) {
          self.error = err;
          //console.log(err);
          $timeout(fetchOpenDeliveries, updateTimeout);
        }
      );
  }
  fetchOpenDeliveries();

  function updatePosition() {
    if (!window.navigator.geolocation) {
      console.log('Geolocation not supported.');
    }
    else {
      window.navigator.geolocation.getCurrentPosition(
        function (position) {
          $scope.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          self.properties.position = $scope.position;
          $http.post('/droneposition', self.properties)
            .then(function (res) {
              self.properties.delivery = res.data.delivery;
              self.properties.status = res.data.status;
            }, function (err) {
              console.log("position update failed! " + err);
            });

          $timeout(updatePosition, updateTimeout);
        },
        function (err) {
          //console.log(err);
          $timeout(updatePosition, updateTimeout);
        });
    }
  }
  updatePosition();
}])

.controller('userControl', ['$scope', '$http', '$timeout', 'uiGmapGoogleMapApi', function ($scope, $http, $timeout, uiGmapGoogleMapApi) {
  var self = this;

}]);

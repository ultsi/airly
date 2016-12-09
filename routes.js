var exports = module.exports = {};
let MainController = require('./controllers/mainController.js');
let DroneController = require('./controllers/droneController.js');
let DeliveryController = require('./controllers/deliveryController.js');
let ShopController = require('./controllers/shopController.js');
let MapController = require('./controllers/mapController.js');

// add routes here
exports.addRoutes = function (app) {

  app.get('/', MainController.index);
  app.get('/map', MapController.index);
  app.get('/shop', ShopController.index);

  app.get('/dronestatus', DroneController.getDroneStatus);

  app.get('/demo', ShopController.site);
  app.get('/delivery_airly', ShopController.airly);
  app.get('/delivery_other', ShopController.otherdelivery);
  app.post('/deliveryHandler', DeliveryController.chooseDelivery);

  app.get('/dronesimulation', DroneController.serveDroneSimulationPage);
  app.post('/droneposition', DroneController.getDronePosition);

  app.get('/delivery/open', DeliveryController.getOpenDeliveries);
  app.get('/delivery/accepted', DeliveryController.getAcceptedDeliveries);
  app.post('/delivery/accept', DeliveryController.acceptDelivery);
  app.post('/drones/accept', DroneController.acceptDelivery);
  app.get('/drones', DroneController.getDrones);
  app.get('/drones/delivering', DroneController.getDeliveringDrones);

};

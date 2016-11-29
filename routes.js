
var exports = module.exports = {};
let MainController = require('./controllers/main.js');
let DemoShopController = require('./controllers/demoshop.js');

// add routes here
exports.addRoutes = function(app) {
  app.get('/', MainController.index);
  app.get('/shop', MainController.shop);
  app.get('/dronestatus', MainController.droneStatus);

  app.get('/demo', DemoShopController.site);
  app.get('/demoshop_airly', DemoShopController.airly);
  app.get('/demoshop_otherdelivery', DemoShopController.otherdelivery);
  app.post('/demoshop', DemoShopController.chooseDelivery);

  app.get('/dronesimulation', MainController.serveDroneSimulationPage);
  app.post('/droneposition', MainController.dronePosition);
};

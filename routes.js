
var exports = module.exports = {};
let MainController = require('./controllers/main.js');
let VendorController = require('./controllers/vendor.js');

// add routes here
exports.addRoutes = function(app) {
  app.get('/', MainController.index);
  app.get('/shop', MainController.shop);
  app.get('/demo', VendorController.site);
  app.get('/airly', VendorController.airly);
  app.get('/otherdelivery', VendorController.otherdelivery);
  app.post('/demo', VendorController.chooseDelivery);
};

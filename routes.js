
var exports = module.exports = {};
let MainController = require('./controllers/main.js');

// add routes here
exports.addRoutes = function(app) {
  app.get('/', MainController.index);
};

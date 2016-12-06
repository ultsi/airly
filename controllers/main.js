
var exports = module.exports = {};
var DRONE_STATUS = {
  "READY": 1,
  "DELIVERING": 2,
  "RETURNING": 3
};

var DELIVERY_STATUS = {
  PENDING: 1,
  ACCEPTED: 2,
  DELIVERED: 3
};

var deliveries = [
  {deliveryId: 0, description: 'Shoes', status: DELIVERY_STATUS.PENDING},
  {deliveryId: 1, description: 'Guitar', status: DELIVERY_STATUS.DELIVERING}
];
var drones = {};

exports.index = function(req, res){
  // serve main page from views
  res.render('pages/index.ejs', {page: 'index'});
};

exports.shop = function(req, res){
  // serve shop page from views
  res.render('pages/index.ejs', {page: 'shop'});
};

exports.postNewDelivery = function(req, res){
  var delivery = req.body.delivery;
  delivery.deliveryId = deliveries.length;
  delivery.status = DELIVERY_STATUS.PENDING;
  deliveries[delivery.deliveryId] = delivery;
  res.status(200);
  res.end();
};

exports.getOpenDeliveries = function(req, res){
  var open = [];
  for(var deliveryId in deliveries){
    var delivery = deliveries[deliveryId];
    if(delivery.status === DELIVERY_STATUS.PENDING){
      open[deliveryId] = delivery;
    }
  }
  res.write(JSON.stringify(open));
  res.status(200);
  res.end();
};

exports.droneStatus = function(req, res){
  res.write(JSON.stringify(drones));
  res.status(200);
  res.end();
};

exports.acceptDelivery = function(req, res){
  var deliveryId = req.body.deliveryId;
  deliveries[deliveryId].status = DELIVERY_STATUS.ACCEPTED;
  drones[req._remoteAddress].delivery = deliveries[deliveryId];
  drones[req._remoteAddress].status = DRONE_STATUS.DELIVERING;
};

exports.serveDroneSimulationPage = function(req, res){
  res.render('pages/index.ejs', {page: 'drone'});
};

exports.dronePosition = function(req, res){
  if(drones[req._remoteAddress]){
    drones[req._remoteAddress].position = req.body.position;
  } else {
    drones[req._remoteAddress] = req.body;
  }
  res.write(JSON.stringify(drones[req._remoteAddress]));
  res.status(200);
  res.end();
};

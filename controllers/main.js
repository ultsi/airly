
var exports = module.exports = {};
var STATUS = {
  "OFF": 1,
  "CHARGING": 2,
  "READY": 3,
  "DELIVERING": 4,
  "RETURNING": 5
};

var drones = [
];


exports.index = function(req, res){
  // serve main page from views
  res.render('pages/index.ejs', {page: 'index'});
};

exports.shop = function(req, res){
  // serve shop page from views
  res.render('pages/index.ejs', {page: 'shop'});
};

exports.droneStatus = function(req, res){
  res.write(JSON.stringify(drones));
  res.status(200);
  res.end();
};

exports.serveDroneSimulationPage = function(req, res){
  res.render('pages/index.ejs', {page: 'drone'});
};

exports.dronePosition = function(req, res){
  console.log(req);
  res.end();
};

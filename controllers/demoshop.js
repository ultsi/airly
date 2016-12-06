
var exports = module.exports = {};

exports.site = function(req, res){
  // serve demo page
  res.render('pages/vendor.ejs', {page: 'demo'});
};

exports.airly = function(req, res){
  res.render('pages/vendor.ejs', {page: 'airly'});
};

exports.otherdelivery = function(req, res){
  res.render('pages/vendor.ejs', {page: 'otherdelivery'});
};

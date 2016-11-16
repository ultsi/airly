
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

// POST
exports.chooseDelivery = function(req, res){
  // Choose Delivery method and redirect
  if(req.body.delivery === 'airly'){
    res.redirect(301, '/demoshop_airly');
  } else {
    res.redirect(301, '/demoshop_otherdelivery');
  }
};


var exports = module.exports = {};

exports.index = function(req, res){
  // serve main page from views
  res.render('pages/index.ejs', {page: 'index'});
};

exports.shop = function(req, res){
  // serve shop page from views
  res.render('pages/index.ejs', {page: 'shop'});
};

exports.demo = function(req, res){
  // serve demo page
  res.render('pages/index.ejs', {page: 'demo'});
};

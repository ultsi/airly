
var exports = module.exports = {};

exports.index = function(req, res){
  // serve main page from views
  res.render('pages/index.ejs', {page: 'index'});
};

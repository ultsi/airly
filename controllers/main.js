
var exports = module.exports = {};

exports.controller = function(app) {

  app.get('/', function(req, res){
    // serve main page from views
    res.render('pages/index.ejs', {page: 'index'});
  });

};

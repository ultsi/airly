var exports = module.exports = {};

exports.index = function (req, res) {
    // serve shop page from views
    res.render('pages/index.ejs', {
        page: 'map'
    });
};

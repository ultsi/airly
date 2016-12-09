var exports = module.exports = {};

exports.index = function (req, res) {
    // serve main page from views
    var deliveryId = req.query.delivery;
    res.render('pages/index.ejs', {
        page: 'index',
        deliveryId: deliveryId
    });
};

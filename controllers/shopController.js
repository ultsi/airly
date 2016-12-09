var exports = module.exports = {};

exports.index = function (req, res) {
    // serve shop page from views
    res.render('pages/index.ejs', {
        page: 'shop'
    });
};

exports.site = function (req, res) {
    // serve demo page
    res.render('pages/index.ejs', {
        page: 'demo'
    });
};

exports.airly = function (req, res) {
    res.render('pages/index.ejs', {
        page: 'airly'
    });
};

exports.otherdelivery = function (req, res) {
    res.render('pages/index.ejs', {
        page: 'otherdelivery'
    });
};

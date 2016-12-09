var exports = module.exports = {};

const DELIVERY_STATUS = {
    'PENDING': 1,
    'ACCEPTED': 2,
    'DELIVERED': 3
};

var deliveries = [];

exports.chooseDelivery = function (req, res) {
    if (req.body.deliveryMethod === 'airly') {
        var deliveryItem = req.body.deliveryItem;
        var delivery = {
            deliveryId: deliveries.length,
            status: DELIVERY_STATUS.PENDING,
            description: deliveryItem
        };
        deliveries[delivery.deliveryId] = delivery;
        res.redirect(301, '/delivery_airly?delivery=' + delivery.deliveryId);
    }
    else {
        res.redirect(301, '/delivery_other');
    }
};

exports.getOpenDeliveries = function (req, res) {
    var open = [];
    for (var deliveryId in deliveries) {
        var delivery = deliveries[deliveryId];
        if (delivery.status === DELIVERY_STATUS.PENDING) {
            open[deliveryId] = delivery;
        }
    }
    res.write(JSON.stringify(open));
    res.status(200);
    res.end();
};

exports.getAcceptedDeliveries = function (req, res) {
    var accepted = [];
    for (var deliveryId in deliveries) {
        var delivery = deliveries[deliveryId];
        if (delivery.status === DELIVERY_STATUS.ACCEPTED) {
            accepted[deliveryId] = delivery;
        }
    }
    res.write(JSON.stringify(accepted));
    res.status(200);
    res.end();
};

exports.acceptDelivery = function (req, res) {
    var deliveryId = req.body.deliveryId;
    deliveries[deliveryId].status = DELIVERY_STATUS.ACCEPTED;
    deliveries[deliveryId].droneAddress = req._remoteAddress;
};

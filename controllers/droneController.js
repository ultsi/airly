var exports = module.exports = {};

const DRONE_STATUS = {
    'AVAILABLE': 1,
    'LOADING': 2,
    'DELIVERING': 3,
    'RETURNING': 4
};

var drones = {};

exports.getDroneStatus = function (req, res) {
    res.write(JSON.stringify(drones));
    res.status(200);
    res.end();
};

exports.getDronePosition = function (req, res) {
    if (drones[req._remoteAddress]) {
        drones[req._remoteAddress].name = req.body.name;
        drones[req._remoteAddress].position = req.body.position;
    }
    else {
        drones[req._remoteAddress] = req.body;
    }
    res.write(JSON.stringify(drones[req._remoteAddress]));
    res.status(200);
    res.end();
};

exports.acceptDelivery = function (req, res) {
    var deliveryId = req.body.deliveryId;
    drones[req._remoteAddress].deliveryId = deliveryId;
    drones[req._remoteAddress].status = DRONE_STATUS.DELIVERING;
};

exports.getDrones = function (req, res) {
    res.write(JSON.stringify(drones));
    res.status(200);
    res.end();
};

exports.getDeliveringDrones = function (req, res) {
    var delivering = [];
    for (var droneId in drones) {
        var drone = drones[droneId];
        if (drone.status === DRONE_STATUS.DELIVERING) {
            delivering[droneId] = drone;
        }
    }
    res.write(JSON.stringify(delivering));
    res.status(200);
    res.end();
};

exports.serveDroneSimulationPage = function (req, res) {
    res.render('pages/index.ejs', {
        page: 'drone'
    });
};

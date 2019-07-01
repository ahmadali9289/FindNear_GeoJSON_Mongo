const Driver = require('../models/driver');

module.exports = {
    greetings(req, res) {
        res.send({msg: 'Hi, you are accessing api routes'});
    },

    index(req, res, next) {
        const {lng, lat} = req.query;

        Driver.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [ parseFloat(lng), parseFloat(lat) ] },
                    spherical: true, 
                    distanceField: "dist.calculated",
                    maxDistance: 200000    
                }
            }
        ])
        .then( drivers => res.send(drivers))
        .catch(next);
    },
    create(req, res, next) {
       const newDriver = req.body;
       Driver.create(newDriver)
       .then(driver => res.send(driver))
       .catch(next);
    },
    edit(req, res, next) {
        const driverId = req.params.id;
        const updatedDriver = req.body;

        Driver.findByIdAndUpdate({_id: driverId}, updatedDriver)
        .then(() => Driver.findById({_id: driverId}))
        .then(driver => res.send(driver))
        .catch(next);
    },
    delete (req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove({_id: driverId})
        .then(driver => res.send(driver))
        .catch(next)
    }
}
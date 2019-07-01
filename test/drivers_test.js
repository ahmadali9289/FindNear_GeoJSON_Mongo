const assert = require('assert');
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('handles the DRIVER controller', () => {
    it('handles the POST /api/driver route', (done) => {
        Driver.count().then(count => {
            request(app)
            .post('/api/driver')
            .send({email: 'test@test.com'})
            .end(() => {
                Driver.count().then(newCount => {
                    assert(newCount === count + 1)
                    done();
                })
            })
    
        })
    });

    it(' handles the PUT /api/driver route for a driver', (done) => {
        const newDriver = new Driver({email: 't@t.com', driving: false});

        newDriver.save()
        .then(() => {
            request(app)
            .put(`/api/driver/${newDriver._id}`)
            .send({driving: true})
            .end(() => {
                Driver.findById({_id: newDriver._id})
                .then(driver => {
                    assert(driver.driving === true);
                    done();
                })
            })
        })
    });

    it(' handles the DELETE /api/driver route for a driver', (done) => {
        const newDriver = new Driver({email: 't@t.com', driving: false});

        newDriver.save()
        .then(() => {
            request(app)
            .delete(`/api/driver/${newDriver._id}`)
            .end(() => {
                Driver.findById({_id: newDriver._id})
                .then(driver => {
                    assert(driver === null);
                    done();
                })
            })
        })
    });

    it (' handles the GET /api/drivers route for near by 200000 meters', (done) => {
        const seatleDrive = new Driver({
            email:'seatletest@test.com', 
            driving: false, 
            geometry: { type:"Point", coordinates: [122.3321, 47.6062]} 
        });
        const islamabadDriver = new Driver({email: 'isb@test.com', driving: true, geometry: { type: "Point", coordinates: [73.0479, 33.6844]} });

        Promise.all([seatleDrive.save(), islamabadDriver.save()])
        .then(() => {
            request(app)
            .get('/api/drivers?lng=73&lat=32')
            .end((error, response) => {
                console.log('Drivers => ', response.body);
                assert(response.body.length > 0);
                done();
            })
        })
    })
})
const drivers = require('../controllers/drivers');

module.exports = (app) => {
    app.get('/api', drivers.greetings);
    app.post('/api/driver', drivers.create);
    app.put('/api/driver/:id', drivers.edit);
    app.delete('/api/driver/:id', drivers.delete);
    app.get('/api/drivers', drivers.index);
}
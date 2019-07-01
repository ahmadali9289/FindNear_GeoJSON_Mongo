const assert = require('assert');
const app = require('../app');
const request = require('supertest');


describe('The Server is running', () => {
    it('Handles a GET request to the /api', (done) => {
        request(app)
        .get('/api')
        .end((err, response) => {
            assert(response.body.msg ===  'Hi, you are accessing api routes');
            done();
        })
    })
})
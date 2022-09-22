const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');


describe('GET /', () => {
    it('should return Hello World', done => {
        supertest(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text/)
            .end((err, res) => {
                assert.equal(res.text, 'Hello World');
                done();
            });
    });
});
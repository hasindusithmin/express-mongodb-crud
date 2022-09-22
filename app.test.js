const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');
const {faker} = require('@faker-js/faker');


describe('GET /', () => {
    it('should return OK', done => {
        supertest(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text/)
            .end((err, res) => {
                assert.equal(res.text, 'OK');
                done();
            });
    });
});

describe('POST /', () => {
    it('should return 201', done => {
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        supertest(app)
            .post('/')
            .send(person)
            .expect(201)
            .end((err, res) => {
                assert.equal(res.status, 201);
                done();
            });
    });
});
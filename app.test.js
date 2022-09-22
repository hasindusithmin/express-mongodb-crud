const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');
const {faker} = require('@faker-js/faker');


describe('GET /',() => {
    it('should return 200', async() => {
        const response = await supertest(app).get('/');
        assert.equal(response.status, 200);
    })
});

// describe('GET /status', () => {
//     it('should return OK', done => {
//         supertest(app)
//             .get('/status')
//             .expect(200)
//             .expect('Content-Type', /text/)
//             .end((err, res) => {
//                 assert.equal(res.text, 'OK');
//                 done();
//             });
//     });
// });

// describe('POST /', () => {
//     it('should return 201', done => {
//         const person = {
//             firstname: faker.name.firstName(),
//             lastname: faker.name.lastName(),
//             email: faker.internet.email(),
//             city: faker.address.city(),
//             country: faker.address.country()
//         }
//         supertest(app)
//             .post('/')
//             .send(person)
//             .expect(201)
//             .end((err, res) => {
//                 assert.equal(res.body.acknowledged, true);
//                 done();
//             });
//     });
// });
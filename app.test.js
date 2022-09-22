const supertest = require('supertest');
const assert = require('assert');
const client = require('./db');
const app = require('./app');
const { faker } = require('@faker-js/faker');


// describe('GET /',() => {
//     it('should return 200', async() => {
//         const response = await supertest(app).get('/');
//         assert.equal(response.status, 200);
//     })
// });

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

// describe('GET /get/:email', () => {
//     it('check if status code equal to 200', async() => {
//         const email = 'Tyrel_Herman1@hotmail.com';
//         const respone = await supertest(app).get(`/get/${email}`)
//         assert.equal(respone.status, 200);
//     })
// });

// describe('GET /get/:email', () => {
//     it('check response body', async() => {
//         const email = 'Tyrel_Herman1@hotmail.com';
//         const respone = await supertest(app).get(`/get/${email}`)
//         const db = await client.db('test').collection('demo').findOne({email})
//         assert.equal(respone.body._id, db._id);
//         assert.equal(respone.body.firstname, db.firstname);
//         assert.equal(respone.body.lastname, db.lastname);
//         assert.equal(respone.body.email, db.email);
//         assert.equal(respone.body.city, db.city);
//         assert.equal(respone.body.country, db.country);
//     })
// });

// describe("GET /get/:email", () => {
//     it("check if status code equal to 404", async () => {
//         const email = "noreply@gmail.com"
//         const respone = await supertest(app).get(`/get/${email}`)
//         assert.equal(respone.status, 404);
//     })
// })


describe("PUT /update/:email", () => {
    it("check if status code equal to 202", async () => {
        const email = "Tyrel_Herman1@hotmail.com";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${email}`).send(person)
        assert.equal(respone.status, 202);
        assert.equal(respone.body.modifiedCount,1)
    })
})

describe("PUT /update/:email", () => {
    it("check request body and database", async () => {
        const email = "Tyrel_Herman1@hotmail.com";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${email}`).send(person)
        const result = await client.db('test').collection('demo').findOne({email})
        assert.equal(result.firstname, person.firstname);
        assert.equal(result.lastname, person.lastname);
        assert.equal(result.city, person.city);
        assert.equal(result.country, person.country);
    })
})

describe("PUT /update/:email", () => {
    it("check if status code equal to 404", async () => {
        const email = "noreply@mail.com";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${email}`).send(person)
        assert.equal(respone.status, 404);
        assert.equal(respone.body.message, "No such email");
    })
});
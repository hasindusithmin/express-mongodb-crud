const supertest = require('supertest');
const assert = require('assert');
const client = require('./db');
const app = require('./app');
const { faker } = require('@faker-js/faker');
const { ObjectID } = require('bson');


describe('GET /status', () => {
    it('should return OK', done => {
        supertest(app)
            .get('/status')
            .expect(200)
            .expect('Content-Type', /text/)
            .end((err, res) => {
                assert.equal(res.text, 'OK');
                done();
            });
    });
});

describe('GET /get',() => {
    it('should return 200', async() => {
        const response = await supertest(app).get('/get');
        assert.equal(response.status, 200);
    })
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
                assert.equal(res.body.acknowledged, true);
                done();
            });
    });
});

describe('GET /get/:id', () => {
    it('check if status code equal to 200', async() => {
        const id = '632c810af68b51535a4fa8e1';
        const respone = await supertest(app).get(`/get/${id}`)
        assert.equal(respone.status, 200);
    })
});

describe('GET /get/:id', () => {
    it('check response body', async() => {
        const id = '632c810af68b51535a4fa8e1';
        const respone = await supertest(app).get(`/get/${id}`)
        const db = await client.db('test').collection('demo').findOne({_id:ObjectID(id)})
        assert.equal(respone.body._id, db._id);
        assert.equal(respone.body.firstname, db.firstname);
        assert.equal(respone.body.lastname, db.lastname);
        assert.equal(respone.body.email, db.email);
        assert.equal(respone.body.city, db.city);
        assert.equal(respone.body.country, db.country);
    })
});

describe("GET /get/:id", () => {
    it("check if status code equal to 404", async () => {
        const id = "xxxxxxxxxxxx"
        const respone = await supertest(app).get(`/get/${id}`)
        assert.equal(respone.status, 404);
        assert.equal(respone.body.message,'No such Id')
    })
})


describe("PUT /update/:id", () => {
    it("check if status code equal to 202", async () => {
        const id = "632c810af68b51535a4fa8e1";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${id}`).send(person)
        assert.equal(respone.status, 202);
        assert.equal(respone.body.modifiedCount,1)
    })
})

describe("PUT /update/:id", () => {
    it("check request body and database", async () => {
        const id = "632c810af68b51535a4fa8e1";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${id}`).send(person)
        const result = await client.db('test').collection('demo').findOne({_id:ObjectID(id)})
        assert.equal(result.firstname, person.firstname);
        assert.equal(result.lastname, person.lastname);
        assert.equal(result.city, person.city);
        assert.equal(result.country, person.country);
    })
})

describe("PUT /update/:id", () => {
    it("check if status code equal to 404", async () => {
        const id = "xxxxxxxxxxxx";
        const person = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        }
        const respone = await supertest(app).put(`/update/${id}`).send(person)
        assert.equal(respone.status, 404);
        assert.equal(respone.body.message, "No such id");
    })
});

describe("DELETE /delete/:id", () => {
    it("check if status code equal to 202", async () => {
        const id = "632c9ee1615922bd548e717c";
        const respone = await supertest(app).get(`/delete/${id}`)
        assert.equal(respone.statusCode,202)
        assert.equal(respone.body.deletedCount,1)
    })
})

describe("DELETE /detele/:id", () => {
    it("check if status code equal to 404", async () => {
        const id = "632c9ee1615922bd548e717c";
        const respone = await supertest(app).get(`/delete/${id}`)
        assert.equal(respone.statusCode,404)
        assert.equal(respone.body.message,"No such id")
    })
})
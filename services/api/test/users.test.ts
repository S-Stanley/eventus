const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe("/users", () => {
    afterEach((done) => {
        done();
    });
    describe("POST /users err", () => {
        it('return an err 422 (missing parameters)', async function () {
            const res = await agent(server)
                .post('/users');
            expect(res.status).to.equal(422);
        });
    });
    describe("POST /users success", () => {
        it('return a HTTP 201 created', async function () {
            const email = random.email();
            const pass = random.name();
            const location = random.city();
            const name = random.name().split(' ')[0];
            const firstname = random.name().split(' ')[0];
            let res = await agent(server)
                .post('/users').send({
                    email: email,
                    password: pass,
                    location: location,
                    name: name,
                    firstname: firstname,
                });
            expect(res.status).to.equal(201);
            res = JSON.parse(res.text);
            expect(res['email']).to.equal(email);
            expect(res['location']).to.equal(location);
            expect(res['name']).to.equal(name);
            expect(res['firstname']).to.equal(firstname);
            expect(res['password']).to.equal(undefined);
        });
    });
});
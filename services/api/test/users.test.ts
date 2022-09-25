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
    describe('test user role update', () => {
        it('test that user role can be updated', async() => {
            const req = await agent(server)
                .patch(`/users/1/role`)
                .send({
                    role: 'ADMIN',
                });
            expect(req.status).to.equal(200);
            const data = JSON.parse(req.text);
            expect(data['_id']).to.equal(1);
            expect(data['role']).to.equal('ADMIN');
        });
        it('test that user role cannot be updated', async() => {
            const req = await agent(server)
                .patch(`/users/1/role`)
                .send({
                    role: 'UNKNOW ROLE',
                });
            expect(req.status).to.equal(400);
            const data = JSON.parse(req.text);
            expect(data?.message).to.equal('Validation failed: role: UNKNOW ROLE is not supported as user role');
        });
    });
    describe('find user by id', () => {
        it('find a existing user', async() => {
            const req = await agent(server)
                .get('/users/1/');
            expect(req.status).to.equal(200);
            const data = JSON.parse(req.text);
            console.log(data);
            expect(data['_id']).to.equal(1);
            expect(data['email']).to.equal('user0');
            expect(data['name']).to.equal('name-user0');
            expect(data['firstname']).to.equal('firstname-user0');
            expect(data['location']).to.equal('Toronto');
            expect(data['apple_user_id']).to.equal(null);
            expect(data['role']).to.equal('ADMIN');
            expect(data['password']).to.equal(null);
        });
        it('search for an unexistant user', async() => {
            const req = await agent(server)
                .get('/users/45392/');
                console.log(JSON.parse(req.text));
                expect(req.status).to.equal(403);
            const data = JSON.parse(req.text);
            expect(data['error']).to.equal('No such user');
        });
    });
});
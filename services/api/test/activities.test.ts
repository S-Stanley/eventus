export{};
const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe('/activites', () => {
    afterEach((done) => {
        done();
    });
    describe("POST /activites", () => {

        const name = random.city();

        it('return a 201 created', async function () {
            let res = await agent(server)
                .post('/activities').send({
                    name: name,
                });
            expect(res.status).to.equal(201);
            res = JSON.parse(res.text);
            expect(res['name']).to.equal(name);
            expect(res['_id']).to.exist;
        });
        it('return a HTTP 403', async function () {
            let res = await agent(server)
                .post('/activities').send({
                    name: name,
                });
            expect(res.status).to.equal(403);
        });
        it('return a HTTP 422', async function () {
            let res = await agent(server).post('/activities')
            expect(res.status).to.equal(422);
        });
    });
    describe("GET /activities", () => {
        it('Should return a 200', async () => {
            let req = await agent(server).get('/activities');
            expect(req.status).to.equal(200);
        });
    });
    describe('GET /activities/:activity_id/hosts', () => {
        it('should return a 422 wrong id format', async () => {
            let req = await agent(server).get('/activities/wrongformatid/hosts');
            expect(req.status).to.equal(422);
        });
        it('should return a 200', async () => {
            let req = await agent(server).get('/activities/628946c2dd2b5e5391ba531a/hosts');
            expect(req.status).to.equal(200);
        });
    });
})
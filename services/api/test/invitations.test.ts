export {};
const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe('/invitations', () => {

    afterEach((done) => {
        done();
    });
    describe('POST /invitations', () => {
        it('Should return 422 missing parameters', async() => {
            const req = await agent(server).post('/invitations');
            expect(req.status).to.equal(422);
        });
    });
});
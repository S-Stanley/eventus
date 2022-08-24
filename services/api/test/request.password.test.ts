export {};
const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe('Test new password request', () => {

    afterEach((done) => {
        done();
    });
    describe('Test workflow success', () => {

        const password_subscribe = random.hash();
        const new_password = random.hash();
        const email = random.email();

        let user_id = undefined;
        let code = undefined;
        let request_id = undefined;

        // it('create new user account', async () => {
        //     const req = await agent(server).post('/users/').send({
        //         email: email,
        //         password: password_subscribe,
        //     });
        //     expect(req.status).to.equal(201);
        //     user_id = JSON.parse(req.text)['_id'];
        // });

        // it('request a new password', async() => {
        //     const req = await agent(server).post('/users/password/new/generate').send({
        //         password: new_password,
        //         user_id: user_id,
        //     });
        //     expect(req.status).to.equal(200);
        //     code = JSON.parse(req.text)['code'];
        //     request_id = JSON.parse(req.text)['_id'];
        // });

        // it('validate password', async() => {
        //     const req = await agent(server).post('/users/password/new/validate').send({
        //         code: code,
        //         request_id: request_id,
        //     });
        //     expect(req.status).to.equal(200);
        // });

    });
});
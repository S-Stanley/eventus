export {};
const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe('/hosts', () => {

    afterEach((done) => {
        done();
    });

    describe('POST /hosts', () => {
        it('send without any body parameters', async () => {
            const req = await agent(server).post('/hosts');
            expect(req.status).to.equal(422);
        });
        it('send with the minimal parameters', async () => {
            const random_values = {
                'name': random.name(),
                'location': random.city(),
                'address': random.address(),
            }
            let req = await agent(server)
                .post('/hosts')
                .send({
                    name: random_values.name,
                    location: random_values.location,
                    address: random_values.address,
                });
            expect(req.status).to.equal(201);
            req = JSON.parse(req.text);
            expect(req['name']).to.equal(random_values.name);
            expect(req['location']).to.equal(random_values.location);
            expect(req['address']).to.equal(random_values.address);
            expect(req['website']).to.equal('');
            expect(req['tel']).to.equal('');
            expect(req['email']).to.equal('');
            expect(req['metro']).to.equal('');
            expect(req['station']).to.equal('');
            expect(req['_id']).to.exist;
        });
        it('send with all parameters', async () => {
            const random_values = {
                'name': random.name(),
                'location': random.city(),
                'address': random.address(),
                'website': random.url(),
                'tel': random.phone(),
                'email': random.email(),
                'metro': random.integer({
                    min: 1,
                    max: 14,
                }).toString(),
                'station': random.city(),
            }
            let req = await agent(server)
                .post('/hosts')
                .send({
                    name: random_values.name,
                    location: random_values.location,
                    address: random_values.address,
                    website: random_values.website,
                    tel: random_values.tel,
                    email: random_values.email,
                    metro: random_values.metro,
                    station: random_values.station,
                });
            expect(req.status).to.equal(201);
            req = JSON.parse(req.text);
            expect(req['name']).to.equal(random_values.name);
            expect(req['location']).to.equal(random_values.location);
            expect(req['address']).to.equal(random_values.address);
            expect(req['website']).to.equal(random_values.website);
            expect(req['tel']).to.equal(random_values.tel);
            expect(req['email']).to.equal(random_values.email);
            expect(req['metro']).to.equal(random_values.metro);
            expect(req['station']).to.equal(random_values.station);
            expect(req['_id']).to.exist;
        });
    });
});
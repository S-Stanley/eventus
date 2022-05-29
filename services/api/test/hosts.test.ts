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
    describe('GET /hosts', () => {
        it('shoud return 200', async () => {
            const req = await agent(server).get('/hosts');
            expect(req.status).to.equal(200);
        });
    });
    describe('GET /hosts/:host_id', () => {
        it('Should return a 422 wrong format', async() => {
            const req = await agent(server).get('/hosts/wrongFormatId');
            expect(req.status).to.equal(422);
        });
        it('Should return a 200', async () => {
            const req = await agent(server).get('/hosts/628f89055163beb4f6233c52');
            const body_json = JSON.parse(req.text);
            expect(req.status).to.equal(200);
        });
    });
    describe('POST /hosts/activity', () => {
        it('Should return a 422 not enouth parameters', async () => {
            const req = await agent(server).post('/hosts/activity');
            expect(req.status).to.equal(422);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('Missing parameter');
        });
        it('Should return a 422 wrong format id', async () => {
            const req = await agent(server).post('/hosts/activity').send({
                host_id: 'wrong format id',
                activity_id: 'wrong format id too',
            });
            expect(req.status).to.equal(422);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('One of the parameter is not in the correct format');
        });
        it('Should return a 400 host or activity do no exist', async () => {
            const req = await agent(server).post('/hosts/activity').send({
                host_id: '628f89055163beb4f6233c52',
                activity_id: '628f89055163beb4f6233c52',
            });
            expect(req.status).to.equal(400);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('The host or the activity do not exist');
        });
    });
    describe('GET /hosts/:host_id/activitiy', () => {
        it('Should return 422 id uncorrect format', async() => {
            const req = await agent(server).get('/hosts/idWrongFormat/activity');
            expect(req.status).to.equal(422);
        });
        it('Should return 200', async() => {
            const req = await agent(server).get('/hosts/628f89055163beb4f6233c52/activity');
            expect(req.status).to.equal(200);
        });
    });
    describe('PATCH /hosts', () => {
        it('Should return a 422 missing parameter', async () => {
            const req = await agent(server).patch('/hosts');
            expect(req.status).to.equal(422);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('Missing parameter');
        });
        it('Should return a 422 wrong host_id format', async () => {
            const req = await agent(server).patch('/hosts').send({
                host_id: 'wrontFormatId',
                name: 'new_name',
            });
            expect(req.status).to.equal(422);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('Host_id is not in the correct format');
        });
        it('Should return a 422 wrong host_id format', async () => {
            const req = await agent(server).patch('/hosts').send({
                host_id: '628f89055263beb4f6233c52',
                name: 'new_name',
            });
            expect(req.status).to.equal(422);
            const response_json = JSON.parse(req.text);
            expect(response_json['error']).to.equal('This host do not exist');
        });
    });
});
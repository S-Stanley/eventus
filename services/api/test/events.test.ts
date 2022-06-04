export{};
const { expect } = require('chai');
const server = require('../server');
require('mocha');
const { agent } = require('supertest');
const chance = require('chance');
const random = new chance();

describe('/events', () => {
    describe('POST /events', () => {
        it('Should return 422 missing parameter', async () => {
            const res = await agent(server).post('/events');
            expect(res.status).to.equal(422);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('Missing parameter');
        });
        it('Should return 403 unknow relation between host and activity', async () => {
            const res = await agent(server).post('/events').send({
                host_id: '628f89055163beb3f6233c52',
                activity_id: '628946c2dd2c5e5391ba531a',
                date_event: '12/05/22',
                time_event: '14:00',
                description: 'really cool activity',
                minimal_number_of_participants: '8',
                maximal_number_of_participantsid: '25',
                created_by: '',
            });
            expect(res.status).to.equal(403);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('This host do not propose this activity');
        });
    });
    describe('GET /events', () => {
        it('Test wrong per_page, should return a 403', async () => {
            const res = await agent(server).get('/events?page=1&per_page=-5');
            expect(res.status).to.equal(403);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('Could not process your request, please check your parameters')
        });
        it('Test wrong page, should return a 403', async () => {
            const res = await agent(server).get('/events?page=-1&per_page=5');
            expect(res.status).to.equal(403);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('Could not process your request, please check your parameters')
        });
        it('Test page 0 and 0 per_page, should return a 200', async () => {
            const res = await agent(server).get('/events?page=0&per_page=0');
            expect(res.status).to.equal(200);
        });
        it('Test good page and per_page, should return a 200', async () => {
            const res = await agent(server).get('/events?page=1&per_page=5');
            expect(res.status).to.equal(200);
        });
        it ('Test good, should return 200', async () => {
            const res = await agent(server).get('/events');
            expect(res.status).to.equal(200);
        });
    });
    describe('GET /events', () => {
        it ('Test with a wrong format for event_id as params should return 400 event not found', async () => {
            const res = await agent(server).get('/events/wrongFormatId');
            expect(res.status).to.equal(400);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('Cannot found this event');
        });
        it ('Test with a non-existant event_id should return 400 event not found', async () => {
            const res = await agent(server).get('/events/6295398199505068fa52867e');
            expect(res.status).to.equal(400);
            const response_json = JSON.parse(res.text);
            expect(response_json['error']).to.equal('Cannot found this event');
        });
    });
});
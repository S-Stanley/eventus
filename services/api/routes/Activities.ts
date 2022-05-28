export {};
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

import Helpers from '../database/helpers/Helpers';
import Utils from '../utils/Utils';

router.post('/', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['name'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const activity_created = await Helpers.Activities.createActivity(req.body.name);
            res.status(201).json(activity_created);
        }
    } catch(e) {
        console.log(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query?.page, 10) || 1;
        const per_page = parseInt(req.query?.per_page) || 10;
        const activities = await Helpers.Activities.findAllActivities(page, per_page);
        res.status(200).json(activities);
    } catch (e) {
        console.error(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

router.get('/:activity_id/hosts', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.activity_id)){
            res.status(422).json('Id is not in the correct format');
        } else if (!await Helpers.Activities.find_activity_by_id(req.params.activity_id)) {
            res.status(400).json('This activity do no exist');
        } else {
            const all_hosts = await Helpers.HostActivityRelations.get_all_hosts_by_activity_id(req.params.activity_id) ?? {};
            res.status(200).json(all_hosts);
        }
    } catch (e) {
        console.error(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

module.exports = router;
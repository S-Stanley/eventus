export {};
const express = require('express');
const router = express.Router();

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

module.exports = router;
export {};
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

import Helpers from '../database/helpers/Helpers';
import Utils from '../utils/Utils';

router.post('/', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['host_id', 'activity_id', 'date_event', 'time_event', 'description', 'minimal_number_of_participants', 'maximal_number_of_participantsid', 'created_by'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const relation_host_activity = await Helpers.HostActivityRelations.find_relation(req.body.host_id, req.body.activity_id);
            if (!relation_host_activity) {
                res.status(403).json({
                    error: 'This host do not propose this activity',
                })
            } else {
                const find_event = await Helpers.Events.find_event_by_datetime_and_created_by(req.body.host_id, req.body.activity_id, req.body.date_event, req.body.time_event, req.body.created_by);
                if (find_event) {
                    res.status(400).json({
                        error: 'You have already created an event with the same host, activity, date and time',
                    });
                } else {
                    const event_created = await Helpers.Events.create_event(
                        req.body.host_id,
                        req.body.activity_id,
                        req.body.date_event,
                        req.body.time_event,
                        req.body.description,
                        req.body.minimal_number_of_participants,
                        req.body.maximal_number_of_participants,
                        req.body.created_by,
                    );
                    if (!event_created) {
                        res.status(400).json({
                            error: 'Error in your request',
                        });
                    } else {
                        res.status(201).json(event_created);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
        res.status(403).json({
            error: 'There was an error fron our side, please try again later',
        });
    }
});

module.exports = router;
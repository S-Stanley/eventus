export {};
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

import Helpers from '../database/helpers/Helpers';
import Utils from '../utils/Utils';

router.post('/', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['name', 'picture', 'host_id', 'activity_id', 'date_event', 'time_event', 'description', 'minimal_number_of_participants', 'maximal_number_of_participantsid', 'price', 'created_by'])){
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
                const find_event = await Helpers.Events.find_event_by_datetime_and_created_by(
                    req.body.name,
                    req.body.picture,
                    req.body.host_id,
                    req.body.activity_id,
                    req.body.date_event,
                    req.body.time_event,
                    req.body.created_by
                );
                if (find_event) {
                    res.status(400).json({
                        error: 'You have already created an event with the same host,activity, date and time',
                    });
                } else {
                    const event_created = await Helpers.Events.create_event(
                        req.body.name,
                        req.body.picture,
                        req.body.host_id,
                        req.body.activity_id,
                        req.body.date_event,
                        req.body.time_event,
                        req.body.description,
                        req.body.minimal_number_of_participants,
                        req.body.maximal_number_of_participants,
                        req.body.price,
                        req.body.created_by,
                        req.body.reservation_link ?? '',
                    );
                    if (!event_created) {
                        res.status(400).json({
                            error: 'Error in your request',
                        });
                    } else {
                        await Utils.Notifications.send_notification_to_all_users();
                        res.status(201).json(event_created);
                    }
                }
            }
        }
    } catch (e) {
        console.error(e);
        res.status(403).json({
            error: 'There was an error fron our side, please try again later',
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const per_page = parseInt(req.query.per_page, 10) || 10;
        const all_events = await Helpers.Events.get_all_events(page, per_page) ?? [];
        if (!all_events) {
            res.status(403).json({
                error: 'Could not process your request, please check your parameters',
            });
        } else {
            if (typeof(all_events) != 'boolean') {
                for (const i in all_events){
                    if (typeof(all_events[i]) != 'boolean') {
                        const host_event = await Helpers.Hosts.get_host_by_id(all_events[i].host_id);
                        const output = {
                            ...all_events[i],
                            location: host_event.location,
                        }
                        all_events[i] = output;
                    }
                }
            }
            console.log(all_events)
            res.status(200).json(all_events);
        }
    } catch (e) {
        console.error(e);
        res.status(403).json({
            error: 'There was an error fron our side, please try again later',
        });
    }
});

router.get('/:event_id', async (req, res) => {
    try {
        const event_id = req.params.event_id || '';
        const event_found = await Helpers.Events.get_event_by_id(event_id);
        if (!event_found) {
            console.error(event_found)
            res.status(400).json({
                error: "Cannot found this event",
            });
        } else {
            if (typeof(event_found) != 'boolean') {
                const host_event = await Helpers.Hosts.get_host_by_id(event_found.host_id);
                event_found.host = host_event;
            }
            res.status(200).json(event_found);
        }
    } catch (e) {
        console.error(e);
        res.status(403).json({
            error: 'There was an error fron our side, please try again later',
        });
    }
});

module.exports = router;
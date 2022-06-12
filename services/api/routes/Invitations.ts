export {};
const express = require('express');
const router = express.Router();

import Helpers from '../database/helpers/Helpers';
import Utils from '../utils/Utils';

router.post('/', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['event_id', 'user_id', 'state'])){
            res.status(422).json({
                error: 'Missing parameter',
            });
        } else {
            const event = await Helpers.Events.get_event_by_id(req.body.event_id);
            const usr = await Helpers.Users.find_user_by_id(req.body.user_id);
            if (!usr || !event){
                res.status(422).json({
                    error: 'Unknow event or user',
                });
            } else {
                const invitation = await Helpers.Invitations.update_invitations(req.body.event_id, req.body.user_id, req.body.state);
                res.status(200).json(invitation);
            }
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

router.get('/:event_id/:user_id', async(req, res) => {
    try {
        const invitation_to_find = await Helpers.Invitations.find_invitation(req.params.event_id, req.params.user_id);
        res.status(200).json(invitation_to_find);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

module.exports = router;
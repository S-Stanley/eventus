export {};
const express = require('express');
const swaggerAutogen = require('swagger-autogen')();

const router = express.Router();

import Helpers from "../database/helpers/Helpers";
import Utils from '../utils/Utils'

router.post('/', async(req : { body: { email: string, password: string, name: string, firstname: string, location: string} }, res) => {
    try {
	if (!Utils.Requests.verifParams(req.body, ['email', 'password', 'name', 'firstname', 'location'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        }
        else {
            const create = await Helpers.Users.create_users(
                req.body.email,
                req.body.password,
                req.body.name,
                req.body.firstname,
                req.body.location,
            );
            if (!create){
                throw new Error("Cannot create user");
            }
            res.status(201).json(create);
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: e,
        })
    }
});

router.post('/auth/gmail', async (req, res) => {
    console.log('ROUTER CONNECTION CALLED');
    try {
        if (!Utils.Requests.verifParams(req.body, ['email', 'name', 'firstname'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const user_to_find = await Helpers.Users.find_user_by_email(req.body.email);
            if (user_to_find) {
                res.status(200).json(user_to_find);
            } else {
                const user_created = await Helpers.Users.create_users(
                    req.body.email,
                    '',
                    req.body.name,
                    req.body.firstname,
                    '',
                );
                res.status(200).json(user_created);
            }
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: e,
        });
    }
});

router.post('/notifications/player_id', async(req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['email', 'player_id'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const is_user_updated = await Helpers.Users.add_player_id(req.body.email, req.body.player_id);
            if (!is_user_updated) {
                res.status(400).json({
                    error: 'Error while trying to update user to add player_id',
                });
            } else {
                res.status(200).json(true);
            }
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

module.exports = router;

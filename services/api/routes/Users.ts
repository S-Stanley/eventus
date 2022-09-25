export {};
const express = require('express');
const swaggerAutogen = require('swagger-autogen')();

const router = express.Router();

import Helpers from "../database/helpers/Helpers";
import Utils from '../utils/Utils';

router.post('/', async(req : { body: { user_id?: string, email: string, password: string, name: string, firstname: string, location: string} }, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['email', 'password'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        }
        else {
            const usr = await Helpers.Users.find_user_by_email(req.body.email);
            if (usr) {
                if (await Helpers.Users.check_password(req.body.password, usr?.password)) {
                    res.status(200).json(usr);
                } else {
                    res.status(401).json('Wrong password');
                }
            } else {
                const create = await Helpers.Users.create_users(
                    req.body.user_id ?? null,
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
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        })
    }
});

router.post('/auth/gmail', async (req, res) => {
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
                    req.body.user_id ?? null,
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
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

router.post('/auth/apple', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['email', 'apple_user_id'])){
            res.status(422).json({
                error: 'Missing parameter',
            });
        } else {
            const user_to_find = await Helpers.Users.find_user_by_apple_user_id(req.body.apple_user_id);
            if (user_to_find) {
                res.status(200).json(user_to_find);
            } else {
                const user_created = await Helpers.Users.create_users(
                    req.body.email,
                    '',
                    '',
                    '',
                    '',
                    req.body.apple_user_id,
                );
                res.status(200).json(user_created);
            }
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
})

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

router.post('/notifications/player_id/apple', async(req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['apple_user_id', 'player_id'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const is_user_updated = await Helpers.Users.add_player_id_with_apple(req.body.apple_user_id, req.body.player_id);
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

router.post('/password/new/generate', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['password', 'email'])){
            res.status(422).json({
                error: 'Missing parameter',
            });
        } else {
            const usr = await Helpers.Users.find_user_by_email(req.body.email);
            if (!usr) {
                throw new Error('User does not exist');
            }
            const generate_password_request = await Helpers.PasswordRequests.create_password_request(
                req.body.password,
                usr._id
            );
            if (!generate_password_request){
                res.status(500).json('Error while trying to generate password request');
            } else {
                const send_email = await Utils.Email.send_email(
                    'You have requested a password change on eventus',
                    usr.email.toLocaleLowerCase(),
                    `Your verification code for your password request change is ${generate_password_request.code}`
                );
                if (!send_email) {
                    res.status(500).json('Error while trying to send email, please try again later');
                } else {
                    res.status(200).json(generate_password_request);
                }
            }
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

router.post('/password/new/validate', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['code', 'request_id'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            await Helpers.PasswordRequests.set_password_request_as_validated(
                req.body.request_id,
                req.body.code,
            );
            res.status(200).json(true);
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

router.patch('/:user_id/role', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['role'])){
            res.status(422).json({
                error: 'Missing parameter',
            });
        } else {
            const update = await Helpers.Users.update_role_user(req.params.user_id, req.body.role);
            res.status(200).json(update);
        }
    } catch(e) {
        console.error(e);
        res.status(400).json(e);
    }
});

router.get('/:user_id', async (req, res) => {
    try {
        const user_to_find = await Helpers.Users.find_user_by_id(req.params.user_id);
        if (!user_to_find){
            res.status(403).json({
                error: 'No such user'
            });
        } else {
            res.status(200).json(user_to_find);
        }
    } catch(e) {
        console.error(e);
        res.status(400).json({
            error: e,
        });
    }
});

module.exports = router;

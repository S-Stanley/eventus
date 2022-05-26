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

module.exports = router;
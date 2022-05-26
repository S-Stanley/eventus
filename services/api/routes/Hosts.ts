export {};
const express = require('express');
const router = express.Router();

const swaggerAutogen = require('swagger-autogen')();

import e from 'cors';
import Helpers from '../database/helpers/Helpers';
import Utils from '../utils/Utils';

router.post('/', async (req, res) => {
    try {
        if (!Utils.Requests.verifParams(req.body, ['name', 'location', 'address'])){
            res.status(422).json({
                error: 'Missing parameter',
            })
        } else {
            const host_created = await Helpers.Hosts.create_host(
                req.body.name,
                req.body?.website ?? '',
                req.body.location,
                req.body?.tel ?? '',
                req.body?.email ?? '',
                req.body.address,
                req.body?.metro ?? '',
                req.body?.station ?? '',
            );
            res.status(201).json(host_created);
        }
    } catch (e) {
        console.error(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

module.exports = router;
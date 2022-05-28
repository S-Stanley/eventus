export {};
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const swaggerAutogen = require('swagger-autogen')();

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

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query?.page, 10) || 1;
        const per_page = parseInt(req.query?.per_page) || 10;
        const all_hosts = await Helpers.Hosts.get_all_host(page, per_page);
        res.status(200).json(all_hosts);
    } catch (e) {
        console.error(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

router.get('/:host_id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.host_id)){
            res.status(422).json('Id is not in the correct format');
        } else {
            const host = await Helpers.Hosts.get_host_by_id(req.params.host_id) ?? {};
            res.status(200).json(host);
        }
    } catch (e) {
        console.error(e);
        res.status(403).json('There was an error fron our side, please try again later');
    }
});

module.exports = router;
export {};
const express = require('express');
const router = express.Router();

import Utils from '../utils/Utils';

router.post('/email', async (req, res) => {
    try {
        const send_email = await Utils.Email.send_email(
            'Email from eventus user',
            process.env.ADMIN_EMAIL,
            `from: ${req.body.from}. ${req.body.message}`
        );
        if (!send_email){
            res.status(400).json("There was an error please try again later");
        } else {
            res.status(200).json("Email sent");
        }
    } catch (e) {
        console.log(e);
        res.status(403).json("There was an error please try again later");
    }
});

module.exports = router;
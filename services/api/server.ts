const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 3042;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/').then(() => {
    console.log('Mongoose connected');
});

app.use('/users', require('./routes/Users'));
app.use('/activities', require('./routes/Activities'));
app.use('/hosts', require('./routes/Hosts'));
app.use('/events', require('./routes/Events'));
app.use('/invitations', require('./routes/Invitations'));

app.get('/ping', (req, res) => {
    res.status(200).json('Api is running');
})

app.listen(port, '0.0.0.0', () => {
    console.log('Running on', port);
});

module.exports = app;

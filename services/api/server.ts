const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const port = 3042;
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/').then(() => {
    console.log('Mongoose connected');
});

app.use('/users', require('./routes/Users'));
app.use('/activities', require('./routes/Activities'));

app.get('/ping', (req, res) => {
    res.status(200).json('Api is running');
})

app.listen(port, () => {
    console.log('Running on', port);
});

module.exports = app;
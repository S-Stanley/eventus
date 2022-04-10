import express from 'express';
import cors from 'cors';
const port = 3042;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json('Api is running');
});

app.listen(port, () => {
    console.log('Running on', port);
});
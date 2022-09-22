
const client = require('./db');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/',async(req, res) => {
    try {
        const result = await client.db('test').collection('demo').insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});



app.listen(3000, async() => {
    try {
        await client.connect()
        console.log('Connected to database\nListening on port 3000');
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = app;
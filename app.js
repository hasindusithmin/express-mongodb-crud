
const client = require('./db');
const express = require('express');
const {faker} = require('@faker-js/faker');

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.get('/generate/:keyword', (req, res) => {

    switch (req.params.keyword) {
        case 'firstname':
            res.send(faker.name.firstName());
            break;
        case 'lastname':
            res.send(faker.name.lastName());
            break;
        case 'email':
            res.send(faker.internet.email());
            break;
        case 'city':
            res.send(faker.address.city());
            break;
        case 'country':
            res.send(faker.address.country());
            break;
        default:
            res.send('Invalid keyword');
    }
})

app.get("/",async(req,res)=>{
    try{
        const result = await client.db('test').collection('demo').find().toArray();
        res.status(200).json(result);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

app.post('/',async(req, res) => {
    try {
        const {firstname, lastname, email, city, country} = req.body;
        const result = await client.db('test').collection('demo').insertOne({firstname, lastname, email, city, country});
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

app.get("/get/:email",async(req,res)=>{
    try {
        const {email} = req.params;
        const result = await client.db('test').collection('demo').findOne({email});
        if (result == null) throw new Error('No such email');
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.put("/update/:email",async(req,res)=>{
    try {
        const {email} = req.params;
        const {firstname, lastname, city, country} = req.body;
        const result = await client.db('test').collection('demo').updateOne({email}, {$set: {firstname, lastname, city, country}});
        if (result.modifiedCount == 0) throw new Error('No such email');
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.delete("/delete/:email",async(req,res)=>{
    try {
        const {email} = req.params;
        const result = await client.db('test').collection('demo').deleteOne({email});
        if (result.deletedCount == 0) throw new Error('No such email');
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})


app.listen(3000, async() => {
    try {
        await client.connect()
        console.log('Connected to database\nListening on port 3000');
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = app;
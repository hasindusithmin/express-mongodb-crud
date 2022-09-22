
const client = require('./db');
const express = require('express');
const {faker} = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

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

app.get("/get",async(req,res)=>{
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

app.get("/get/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await client.db('test').collection('demo').findOne({_id: ObjectId(id)});
        if (result == null) throw new Error('No such Id');
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.put("/update/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {firstname, lastname, city,email,country} = req.body;
        const result = await client.db('test').collection('demo').updateOne({_id:ObjectId(id)}, {$set: {firstname, lastname, city,email,country}});
        if (result.modifiedCount == 0) throw new Error('No such id');
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.get("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await client.db('test').collection('demo').deleteOne({_id:ObjectId(id)});
        if (result.deletedCount == 0) throw new Error('No such id');
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await client.db('test').collection('demo').findOne({_id: ObjectId(id)});
        res.render('edit', {result});
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
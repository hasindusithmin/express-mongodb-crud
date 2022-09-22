
const {MongoClient} = require('mongodb');

const url = process.env.DB_URL;

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = client;
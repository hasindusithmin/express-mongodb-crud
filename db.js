
const MongoClinet = require('mongodb').MongoClient;

MongoClinet.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(client => {
        console.log('Connected to Database');
        module.exports = client;
    }).catch(err => {
        console.log(err);
    });

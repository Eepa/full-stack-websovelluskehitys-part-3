const mongoose = require('mongoose');
const secrets = require('../secrets');

const MONGODB_URI = process.env.MONGODB_URI || secrets.getMongoDBUri();

const url = MONGODB_URI;
mongoose.connect(url);

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
});

module.exports = Person;
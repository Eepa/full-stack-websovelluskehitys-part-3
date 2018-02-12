const mongoose = require('mongoose');
const secrets = require('../secrets');

const MONGOUSER = process.env.MONGOPUSER || secrets.getMongoUser();
const MONGOPASSWORD = process.env.MONGOPASSWORD || secrets.getMongoPassword();

const url = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@ds135186.mlab.com:35186/full-stack-part-3-phone-book`;

mongoose.connect(url);

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
});

module.exports = Person;
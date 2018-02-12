const mongoose = require('mongoose');
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config();
}

const MONGODB_URI = process.env.MONGODB_URI;

const url = MONGODB_URI;
mongoose.connect(url);

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
});

module.exports = Person;
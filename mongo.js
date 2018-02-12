const mongoose = require('mongoose');
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config();
}

const MONGODB_URI = process.env.MONGODB_URI ;

const url = MONGODB_URI;

mongoose.connect(url);

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
});

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(100000));
};

const newName = process.argv[2];
const newNumber = process.argv[3];

if(newName && newNumber) {

    const person = new Person({
        name: process.argv[2],
        number: process.argv[3],
        id: generateId()
    });
    person
        .save()
        .then(result => {
            console.log(`Lisätään henkilö ${result.name} numero ${result.number} luetteloon`);
            mongoose.connection.close()
        });

} else {
    Person
        .find({})
        .then(result => {
            console.log("Puhelinluettelo:");
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close()
        });

}

const mongoose = require('mongoose');
const secrets = require('./secrets');

const MONGOUSER = process.env.MONGOPUSER || secrets.getMongoUser();
const MONGOPASSWORD = process.env.MONGOPASSWORD || secrets.getMongoPassword();

const url = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@ds135186.mlab.com:35186/full-stack-part-3-phone-book`;

mongoose.connect(url);

console.log(MONGOUSER);
console.log(MONGOPASSWORD);

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

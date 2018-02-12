const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

morgan.token('body-content', function (req) {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :body-content :status :res[content-length] - :response-time ms'));

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    };
};

app.get('/api/persons', (req, res) => {
    Person
        .find({ }, { __v: 0 } )
        .then(persons => {
            res.json(persons.map(formatPerson));
        })
        .catch(error => {
            console.log(error);
            res.status(404).end();
        });
});

app.get('/info', (req, res) => {

    Person
        .find({ }, { __v: 0 } )
        .then(persons => {
            const personInformation = `Puhelinluettelossa ${persons.length} henkilön tiedot `;

            res.send(
                `<p>${personInformation}</p>
                <p>${new Date()}</p>`);
        })
        .catch(error => {
            console.log(error);
            res.status(404).end();
        });



});

app.get('/api/persons/:id', (req, res) => {

    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(formatPerson(person));
            } else {
                res.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({ error: 'Malformatted id' });
        });

});

const nameIsValid = (name) => {
    if (name !== undefined && name !== "") {
        const person = persons.find(person => person.name === name);
        return person === undefined;
    }
    return false;
};

const numberIsValid = (number) => {
    return number !== undefined && number !== "";
};

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!nameIsValid(body.name)) {
        return res.status(400).json({error: "Name cannot be empty and must be unique"});
    }

    if(!numberIsValid(body.number)) {
        return res.status(400).json({error: "Number cannot be empty"});
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => {
            res.json(formatPerson(savedPerson));
        });
});

app.delete('/api/persons/:id', (req, res) => {

    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => {
            res.status(400).send({ error: 'Malformatted id' })
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
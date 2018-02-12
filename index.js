const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

morgan.token('body-content', function (req, res) {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :body-content :status :res[content-length] - :response-time ms'));

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const personInformation = `Puhelinluettelossa ${persons.length} henkilön tiedot `;
    res.send(
        `<p>${personInformation}</p>
        <p>${new Date()}</p>`
    );
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(100000));
};

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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    persons = persons.concat(person);
    res.json(person);

});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
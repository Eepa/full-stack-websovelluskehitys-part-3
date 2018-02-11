const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
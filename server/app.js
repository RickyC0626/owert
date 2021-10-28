const express = require('express');
const app = express();

const fetch = require('node-fetch');

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/compound', (req, res) => {
    res.send(`
        <p>Available Routes for /compound</p>
        <ul>
            <li><b>/name/:compoundName</b> - search for a compound by name</li>
            <li><b>/formula/:formula</b> - search for a compound by formula</li>
        </ul>
    `);
});

app.get('/compound/name/:compoundName', (req, res) => {
    const compoundName = req.params.compoundName;
    const compoundURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compoundName}/JSON`;
    getCompound(compoundURL)
    .then(data => {
        res.status(200).send(data);
    }).catch(err => console.error(err));
});

app.get('/compound/formula/:formula', (req, res) => {
    const formula = req.params.formula;
    const formulaURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${formula}/JSON`;
    getCompound(formulaURL)
    .then(data => {
        res.status(200).send(data);
    }).catch(err => console.error(err));
});

const getCompound = async (url = '') => {
    // TODO: cache the data if first time fetching, otherwise fetch from cache
    const response = await fetch(url);
    return response.json();
};

app.listen(port, () => {
    console.log(`OWERT running at http://${hostname}:${port}`);
});
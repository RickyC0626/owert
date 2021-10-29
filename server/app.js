const express = require('express');
const app = express();

const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const unbakedDataCache = new NodeCache({ stdTTL: 3000, checkperiod: 1500 });

const hostname = '127.0.0.1';
const port = 3001;

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

    if(unbakedDataCache.has(compoundName))
        res.status(200).send(unbakedDataCache.get(compoundName));
    else {
        getCompound(compoundURL)
        .then(data => {
            unbakedDataCache.set(compoundName, data);
            res.status(200).send(data);
        }).catch(err => console.error(err));
    }
});

app.get('/compound/formula/:formula', (req, res) => {
    const formula = req.params.formula;
    const formulaURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${formula}/JSON`;

    if(unbakedDataCache.has(formula))
        res.status(200).send(unbakedDataCache.get(formula));
    else {
        getCompound(formulaURL)
        .then(data => {
            unbakedDataCache.set(formula, data);
            res.status(200).send(data);
        }).catch(err => console.error(err));
    }
});

const getCompound = async (url = '') => {
    const response = await fetch(url);
    return response.json();
};

app.listen(port, () => {
    console.log(`OWERT running at http://${hostname}:${port}`);
});
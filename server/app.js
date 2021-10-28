const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/compound', (req, res) => {
    res.send('Got a GET request at /compound');
});

app.get('/compound/name/:compoundName', (req, res) => {
    res.json(req.params);
});

app.get('/compound/formula/:formula', (req, res) => {
    res.json(req.params);
});

app.listen(port, () => {
    console.log(`OWERT running at http://${hostname}:${port}`);
});
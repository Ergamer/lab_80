const express = require('express');
const mysql = require('mysql');

const items = require('./app/items');
const categories = require('./categories');
const locations = require('./locations');
const app = express();

const port = 8000;

app.use(express.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '198721',
    database: 'items'
});

connection.connect((err) => {
    if (err) throw err;

    app.use('/items', items(connection));
    app.use('/categories', categories(connection));
    app.use('/locations', locations(connection));


    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});
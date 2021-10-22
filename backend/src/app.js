const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');


const projethorDB = require('./database/db');

const app = express();

projethorDB();

app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));

app.use(express.json({ limit: 1000000 }));
app.use(express.urlencoded({ limit: 1000000, extended: true }));

app.all('*', require('../src/routes/index'));

app.get('/', (req, res) => { 
    return res.send('jonas gataao');
});

app.listen(3001);
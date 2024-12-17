require('dotenv').config()

const express = require('express');
const path = require('path');
const links = require('./routes/links.js');
const app = express();
const mongoose = require('mongoose');

const basedata = process.env.MONGODB_URI
const PORT = 5000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use('/', links);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

mongoose.connect(basedata)
.then(result => {
    app.listen(PORT, () => {
        console.log("[+] Listen on port", PORT)
    });
}).catch(err => console.log('Connection error...', err));

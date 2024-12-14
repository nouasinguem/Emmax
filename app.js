const express = require('express');
const path = require('path');
const links = require('./routes/links');
const app = express();
const mongoose = require('mongoose');

const basedata = 'mongodb+srv://emmanuel:Maxime11@cluster0.b1wf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());

app.use('/', links);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

mongoose.connect(basedata)
.then(result => {
    app.listen(5000);
}).catch(err => console.log('Connection error...', err));

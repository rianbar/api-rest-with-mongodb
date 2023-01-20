require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uri = process.env._CON_;

//setando tipo de dados da requisiçao e resposta
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//crud routes
app.use(routes);

//conectando a base de dados e ao localhost
mongoose.connect(uri)
    .then(() => {
        app.listen(port);
        console.log('Connected!');
    })
    .catch(e => {
        console.log(e);
    })
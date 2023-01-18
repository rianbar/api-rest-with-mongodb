const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongoose connecting
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database connected')
        app.emit('pronto!')
    }).catch(e => console.log(e))

//crud routes
app.use(routes);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(port, () => console.log('running!'));
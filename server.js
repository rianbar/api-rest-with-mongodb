const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');

//crud routes
app.use(routes);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(port, () => console.log('running!'));
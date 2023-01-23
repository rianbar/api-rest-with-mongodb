const express = require('express');
const routes = express.Router();
const authController = require('./src/Controllers/authController');
const crudController = require('./src/Controllers/crudController');


//create route
routes.post('/', crudController.crudCreate);

//read all route
routes.get('/', crudController.crudRead);

//read one route
routes.get('/:id', crudController.crudFindOne);

//update route
routes.patch('/update/:id', crudController.crudUpdate);

//delete route
routes.delete('/delete', crudController.crudDelete);

//Authenticatoin Routes
routes.post('/auth/register', authController.apiRegister);
routes.post('/auth/login', authController.apiLogin);


module.exports = routes
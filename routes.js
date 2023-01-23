const express = require('express');
const routes = express.Router();
const authController = require('./src/Controllers/authController');
const crudController = require('./src/Controllers/crudController');
const checkToken = require('./src/Middlewares/checkTokenMiddleware');


//create route
routes.post('/', checkToken, crudController.crudCreate);

//read all route
routes.get('/', crudController.crudRead);

//read one route
routes.get('/:id', checkToken, crudController.crudFindOne);

//update route
routes.patch('/update/:id', checkToken, crudController.crudUpdate);

//delete route
routes.delete('/delete', checkToken, crudController.crudDelete);

//Authenticatoin Routes
routes.post('/auth/register', authController.apiRegister);
routes.post('/auth/login', authController.apiLogin);


module.exports = routes
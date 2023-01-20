const express = require('express');
const routes = express.Router();
const Person = require('./Models/Person');

//INSERT
routes.post('/', async (req, res) => {
    const { nome, sobrenome, ocupacao, idade } = req.body;

    if(!nome || !sobrenome || !ocupacao || !idade) {
        res.status(422).json( { error: "todos os campos são obrigatórios" })
        return
    }

    const person = { nome, sobrenome, ocupacao, idade }

    try {
        await Person.create(person)
        res.status(200).json({ message: "Pessoa inserida com sucesso!" })
    } catch(e) {
        res.status(500).json({ error: e })
    }
})

//SELECT
routes.get('/', async (req, res) => {
    try {
        const docs = await Person.find({});
        res.status(200).json(docs);
    } catch(error) {
        res.status(404).json({
            message: "Ocorreu um erro na sua requisição!"
        })
    }

})

//FIND ONE
routes.get('/:id', async (req, res) => {
    try {
        const doc = await Person.findOne({ _id: req.params.id });
        res.status(200).json(doc);
    } catch(error) {
        res.status(404).json({
            message: "Ocorreu um erro na sua requisição!"
        })
    }
})

//UPDADE
routes.patch('/update/:id', async (req, res) => {
    if(Object.keys(req.body).length == 0) {
        res.json({
            message: "Você precisa enviar algum valor!"
        });
        return
    }

    try {
        await Person.replaceOne({ _id: req.params.id }, req.body);
        res.status(200).json({
            message: "Objeto modificado com sucesso!"
        })
    } catch(error) {
        res.status(404).json({
            message: "Ocorreu um erro na sua requisição!"
        })
    }
})

//DELETE
routes.delete('/delete', async (req, res) => {
    if(Object.keys(req.body).length == 0) {
        res.json({
            message: "Você precisa enviar algum valor!"
        });
        return
    }
    
    try {
        await Person.deleteOne(req.body);
        res.status(200).json({
            message: "Objeto correspondente foi deletado com sucesso!"
        })
    } catch(error) {
        res.status(404).json({
            message: "Ocorreu um erro na sua requisição!"
        })
    }
})

module.exports = routes
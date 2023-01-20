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
    await Person.find({}, (err, docs) => {
        if (err) throw err;
        res.status(200).json(docs);
    });

})

module.exports = routes
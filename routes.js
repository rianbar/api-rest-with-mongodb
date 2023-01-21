const express = require('express');
const routes = express.Router();
const Person = require('./Models/Person');


//INSERT
routes.post('/', async (req, res) => {
    const { nome, sobrenome, ocupacao, idade } = req.body;
    if(!nome || !sobrenome) return res.status(422).json( { error: "os campos nome e sobrenome são obrigatórios" });

    const person = { nome, sobrenome, ocupacao, idade };

    try {
        await Person.create(person);
        const response = {
            message: "Usuário criado com sucesso",
            usuario_criado: req.body,
            request: {
                type: "GET",
                descricao: "ver todos os usuários",
                url: "http://localhost:3000/"
            }
        }
        return res.status(200).json(response);
    } catch(err) {
        return res.status(500).json({ message: err })
    }
})


//SELECT
routes.get('/', (req, res) => {
    Person.find({}, (err, docs) => {
        if (err) return res.status(500).json({ message: "ocorreu um erro em sua requisição" });
        
        const response = {
            quantidade: docs.length,
            users: docs.map(user => {
                return {
                    _id: user._id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    request: {
                        type: "GET",
                        descricao: "retorna todas as informações",
                        url: `http://localhost:3000/${user.id}`
                    }
                }
            })
        }
        return res.status(200).json(response)
    })
})


//FIND ONE
routes.get('/:id', async (req, res) => {
   const docFind = await Person.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) return res.status(500).json({ message: err});
    if (Object.keys(doc).length == 0) return req.status(404).json({ message: "usuário não existe" });

    const response = {
        _id: doc._id,
        nome: doc.nome,
        sobrenome: doc.sobrenome,
        ocupacao: doc.ocupacao,
        idade: doc.idade,
        request: {
            type: "GET",
            descricao: "ver todos os usuários",
            url: "http://localhost:3000/"
        }
    }

    return res.status(200).json(response);
   })
})


//UPDADE
routes.patch('/update/:id', async (req, res) => {
    if(Object.keys(req.body).length == 0) return res.json({ message: "Você precisa enviar algum valor!" });
    const paramId = { _id: req.params.id };
    const bodyUpdate = req.body

    try {
        const userUpdate = await Person.updateOne(paramId, bodyUpdate);
        const response = {
            message: "usuário atualizado com sucesso!",
            request: {
                type: "GET",
                descricao: "visualizar usuário",
                url: `http://localhost:3000/${req.params.id}`
            }
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})


//DELETE
routes.delete('/delete', async (req, res) => {
    if(Object.keys(req.body).length == 0) return res.json({ message: "Você precisa enviar algum valor!" });
    
    const deleteUser = await Person.deleteOne(req.body);
    const response = {
        message: "usuário(s) removido(s) com sucesso",
        quantidade_removidos: deleteUser.deletedCount,
        request: {
            type: "INSERT",
            descricao: "Inserir um novo usuário",
            url: "http://localhost:3000/",
            metodo: {
                nome: "String",
                sobrenome: "String",
                ocupacao: "String",
                idade: "Number"
            }
        }
    }
    res.status(200).json(response)
})


module.exports = routes
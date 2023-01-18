require('dotenv').config();
const express = require('express');
const routes = express.Router();
const dbName = "CRUDatabase";
const url = process.env.CONNECTSTRING
const colecao = "users";
const mongodb = require('mongodb').MongoClient;

//start database
mongodb.connect(url, (err, client) => {
    if (err) throw err;
    const dbo = client.db(dbName);


    //Get Objects
    routes.get('/', (req, res) => {
        res.send('hello world!');
    })
    
    //Insert Objects
    routes.post('/:nome/:sobrenome', (req, res) => {
        nome = req.params.nome
        sobrenome = req.params.sobrenome
        
        dbo.collection(colecao).insertOne({ nome, sobrenome }, (err, result) => {
            if (err) throw err;
            res.send('Objetos inseridos com sucesso!')
            client.close();
        })
    })
})

module.exports = routes
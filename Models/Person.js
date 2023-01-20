const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    nome: String,
    sobrenome: String,
    ocupacao: String,
    idade: Number
})

module.exports = Person;
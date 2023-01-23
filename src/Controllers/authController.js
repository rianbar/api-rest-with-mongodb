require('dotenv').config();
const user = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.apiRegister = async (req, res) => {
    const { nome, email, senha, confirme_senha } = req.body
    if (!nome || !email || !senha || !confirme_senha) {
        return res.status(422).json({ error: "todos os campos devem estar preenchidos!" }); 
    }
    
    if (confirme_senha !== senha) {
        return res.status(422).json({ error: "suas senhas não são compatíveis" })
    }

    userExists = await user.findOne({ email: email })
    if (userExists) return res.status(422).json({ error: "usuário já existe, utilize outro nome" }) 
    
    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt)

    //create user
    user.create({ nome, email, senha: passwordHash });
    res.status(200).json({ message: "Usuário criado com sucesso!" })
}


exports.apiLogin = async (req, res) => {
    const {email, senha} = req.body
    if (!email || !senha) {
        return res.status(422).json({ error: "email e senha devem ser enviados" }); 
    }

    userExists = await user.findOne({ email: email })
    if (!userExists) return res.status(422).json({ error: "usuário não encontrado" });
    
    //checando se senhas são compativeis
    const checkPassword = await bcrypt.compare(senha, userExists.senha);
    if (!checkPassword) {
        return res.status(422).json({ error: "senha incorreta! tente novamente." });
    }

    // criando e enviando o json web token
    try {
        const token = jwt.sign({
            id: userExists._id
        }, 
            process.env._SECRET_);

        res.status(200).json({ message: "autenticação concluida com sucesso!", token });

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Ocorreu um erro no servidor, tente novamente mais tarde!" });
    }

}
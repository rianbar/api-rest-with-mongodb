require('dotenv').config();
const jwt = require('jsonwebtoken');

checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ alerta: "você não está autorizado!" });
    }

    try {
        const secret = process.env._SECRET_

        jwt.verify(token, secret);
        next();

    } catch(err) {
        res.status(400).json({ message: "token inválido" });
    }
}

module.exports = checkToken
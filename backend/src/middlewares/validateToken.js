const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    // console.log("authRequired" + token)
    if (!token) {
        return res.status(401).json({ message: "No token, autorizacion denegada" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token Invalido" });
        }
        req.user = user;
        next()
    })
}

module.exports = {
    authRequired
}
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret123'; 

class Middleware {
    async authorization (req, res, next) {
        try {
            const token = await req.headers['authorization'];
            
            if (!token) {
                return res.status(403).send({ message: "No token provided!" });
            }
            
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
        } catch (error) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        next();
    }
}

module.exports = new Middleware();

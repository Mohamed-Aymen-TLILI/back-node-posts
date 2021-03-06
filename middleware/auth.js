const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.auth = (req, res, next) => {
    try {
        // Récupère le token du header en séparant "Bearer" du "token"
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        
        // Si l'id existe mais qu'il est différent de celui récupéré dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
};

exports.authAdmin = (req, res, next) => {
    try {
        // Récupère le token du header en séparant "Bearer" du "token"
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        
        // Si l'id existe mais qu'il est différent de celui récupéré dans le token
        if (!userId.isAdmin) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
};
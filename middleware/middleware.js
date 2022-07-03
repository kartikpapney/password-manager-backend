const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if(err) {
            res.status(403).send(err);
            // res.redirect('/');
        } else {
            req.body.number = authData.number;
            next();
        }
    });
}

module.exports = verifyToken;
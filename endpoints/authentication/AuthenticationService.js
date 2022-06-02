const userService = require('../user/UserServices');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../user/UserModel');



const authenticateTokenAndAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        if (!(user.isAdministrator)) return res.sendStatus(401);
        req.user = user;
        next();
    });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
};

const createSessionToken = (req, res, callback) => {
    const b64auth = (req.headers.authorization).split(' ')[1];
    const [userID, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (!(userID && password)) return res.status(400).json({ Message: "Bitte UserID und Passwort angeben!" });

    try {
        User.findOne({ userID: userID }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, valid) => {
                    if (valid) {
                        const accessToken = jwt.sign({ userID: userID, userName: user.userName, isAdministrator: user.isAdministrator }, process.env.ACCESS_TOKEN_SECRET);
                        return callback(null, accessToken);
                    }
                    return callback({ Message: "Anmeldedaten inkorrekt." }, null);
                });
            } else {
                return callback({ Message: "User existiert nicht." }, null);
            }

        });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    authenticateTokenAndAdmin,
    createSessionToken,
    authenticateToken
};


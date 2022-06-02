const express = require('express');
const userService = require('./UserServices');
const authenticationService = require('../authentication/AuthenticationRoute');

const router = express.Router();

router.get('/', (req, res) => {
    userService.findAllUser((err, user) => {
        if (user) {
            let arr = [];
            user.forEach((obj) => {
                let { userID, userName, password, isAdministrator } = obj;
                let subuser = { userID, userName, isAdministrator };
                arr.push(subuser);
            });
            res.json(arr);
        }
    });
});

router.post('/', (req, res) => {
    userService.createUser(req.body, (err, user) => {
        if (user) {
            let { userID, userName, password, isAdministrator } = user;
            let subuser = { userID, userName, isAdministrator };
            res.json(subuser);
        } else {
            res.status(400).json(err);
        }
    });
});

router.get('/:userID', (req, res) => {
    userService.findUser(req.params.userID, (err, user) => {
        if (user) {
            let { userID, userName, password, isAdministrator } = user;
            let subuser = { userID, userName, isAdministrator };
            res.json(subuser);
        } else {
            res.status(400).json(err);
        }
    });
});

router.put('/:userID', (req, res) => {
    userService.updateUser(req.params.userID, req.body, (err, user) => {
        if (user) {
            let { userID, userName, password, isAdministrator } = user;
            let subuser = { userID, userName, isAdministrator };
            res.json(subuser);
        } else {
            res.status(400).json(err);
        }

    });
});

router.delete('/:userID', (req, res) => {
    userService.deleteUser(req.params.userID, (err, user) => {
        if (user) {
            let { userID, userName, password, isAdministrator } = user;
            let subuser = { userID, userName, isAdministrator };
            res.json(subuser);
        } else {
            res.status(400).json(err);
        }
    });
});

module.exports = router;
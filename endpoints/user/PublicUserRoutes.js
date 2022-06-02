const express = require('express');
const userService = require('./UserServices');
const authenticationService = require('../authentication/AuthenticationRoute');

const router = express.Router();

router.get('/', (req, res) => {
    userService.findAllUser((err, user) => {
        if(user) res.json(user);
    });
});

router.post('/', (req, res) => {
        userService.createUser(req.body, (err, user) => {
            if(user){
                res.json(user);
            }else{
                res.status(400).json(err);
            }
        });
});

router.get('/:userID', (req, res) => {
    userService.findUser(req.params.userID, (err, user) => {
        if(user){
            res.json(user);
        }else{
            res.status(400).json(err);
        }
    });
});

router.put('/:userID', (req, res) => {
    userService.updateUser(req.params.userID, req.body, (err, user) => {
        if(user){
           res.json(user); 
        }else{
            res.status(400).json(err);
        }

    });
});

router.delete('/:userID', (req, res) => {
    userService.deleteUser(req.params.userID, (err, user) => {
        if(user){
            res.json(user);
        }else{
            res.status(400).json(err);
        }
    });
});

module.exports = router;
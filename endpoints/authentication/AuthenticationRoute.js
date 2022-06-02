require('dotenv').config();
const express = require('express');
const authenticationService = require('./AuthenticationService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../user/UserModel');


const router = express.Router();


router.get('/', (req, res) => {
    authenticationService.createSessionToken(req, res, (err, token) => {
        if(token){
            res.header('Authorization', 'Bearer '+ token);
            res.json(token);
        }else{
            res.status(401).json(err);
        }
    });
});


module.exports = router;
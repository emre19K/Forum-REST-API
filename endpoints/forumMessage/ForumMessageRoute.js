const express = require('express');
const messageServices = require('./ForumMessageServices');
const authenticationService = require('../authentication/AuthenticationService');

const router = express.Router();

router.get('/', (req, res) => {
    let threadID = req.query.forumThreadID;
    if (threadID) {
        messageServices.findThreadMessage(threadID, (err, msg) => {
            if (msg) {
                res.json(msg);
            } else {
                res.status(400).json(err);
            }
        });
    } else {
        messageServices.findAllMessages((err, msg) => {
            if (msg) {
                res.json(msg);
            } else {
                res.status(400).json(err);
            }
        });
    }

});

router.get('/:forumThreadID', (req, res) => {
    messageServices.findMessage(req.params.forumThreadID, (err, msg) => {
        if(msg){
            res.json(msg);
        }else{
            res.status(400).json(err);
        }
    });
});

router.post('/', authenticationService.authenticateToken, (req, res) => {
    messageServices.createMessage(req, res, (err, msg) => {
        if (msg) {
            res.json(msg);
        } else {
            res.status(400).json(err);
        }
    });

});

router.put('/:forumThreadID', authenticationService.authenticateToken, (req, res) => {
    messageServices.updateMessage(req.params.forumThreadID, req.body, (err, msg) => {
        if (msg) {
            res.json(msg);
        } else {
            res.status(400).json(err);
        }
    });
});

router.delete('/:messageID', authenticationService.authenticateToken, (req, res) => {
    messageServices.deleteMessage(req.params.messageID, (err, msg) => {
        if (msg) {
            res.json(msg);
        } else {
            res.status(400).json(err);
        }
    });
});

module.exports = router;
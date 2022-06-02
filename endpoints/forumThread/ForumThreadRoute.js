const express = require('express');
const router = express.Router();
const threadServices = require('./ForumThreadService');
const authenticationService = require('../authentication/AuthenticationService');

router.get('/', (req, res) => {
    let owner = req.query.ownerID;

    if(owner){
        threadServices.findThreadUser(req.query.ownerID, (err, thread) => {
            if(thread){
                res.json(thread);
            }
        });
    }else{
        threadServices.findAllThreads((err, thread) => {
            if(thread){
                res.json(thread);
            }
        });
    }
});

router.get('/:threadID/forumMessages', (req, res) => {
    threadServices.findAllMessagesOfThread(req.params.threadID, (err, msg) => {
        if(msg){
            res.json(msg);
        }else{
            res.json(err);
        }
    });
});

router.get('/myForumThreads', (req, res) => {
    threadServices.findThreadLogged(req, (err, thread) => {
        if(thread){
            res.json(thread);
        }else{
            res.json(err);
        }
    });
});

router.post('/', authenticationService.authenticateToken, (req, res) => {
    threadServices.createThread(req, (err, thread) => {
        if(thread){
            res.json(thread);
        }else{
            res.status(401).json(err);
        }
    });
});

router.get('/:threadId', (req, res) => {
    threadServices.findThread(req.params.threadId, (err, thread) => {
        if(thread){
            res.json(thread);
        }else{
            res.status(400).json(err);
        }
    });
});

router.put('/:threadId', authenticationService.authenticateToken, (req, res) => {
    threadServices.updateThread(req.params.threadId, req.body, (err, thread) => {
        if(thread){
            res.json(thread);
        }else{
            res.status(400).json(err);
        }
    });
});

router.delete('/:threadId', authenticationService.authenticateToken, (req, res) => {
    threadServices.deleteThread(req.params.threadId, (err, thread) => {
        if(thread){
            res.json(thread);
        }else{
            res.status(400).json(err);
        }
    });
    
});


module.exports = router;
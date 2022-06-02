const Thread = require('./ForumThreadModel');
const decode = require('jwt-decode');
const Message = require('../forumMessage/ForumMessageModel');

const findAllThreads = (callback) => {
    Thread.find((err, thread) => {
        if(thread) return callback(null, thread);
    });
};

const createThread = (param, callback) => {
    let decodedTokenUserId = decode(param.header('authorization'));
    let thread = new Thread({
        name: param.body.name,
        description: param.body.description,
        ownerID: decodedTokenUserId.userID
    });
    thread.save((err, thread) => {
        if(thread) return callback(null, thread);
        return callback({Message: "Nicht eingeloggt."}, null);
    });
};

const findThread = (param, callback) => {
    Thread.findById(param, (err, thread) => {
        if(thread) return callback(null, thread);
        return callback({Message: "Thread nicht gefunden."}, null);
    });
};

const findThreadLogged = (param, callback) => {
    let decodedTokenUserId = decode(param.header('authorization'));
    Thread.find({ownerID: decodedTokenUserId.userID}, (err, thread) => {
        if(thread) return callback(null, thread);
        return callback({Message: "Keine Threads gefunden..."}, null);
    });
};

const findThreadUser = (param, callback) => {
    Thread.find({ownerID: param}, (err, thread) => {
        if(thread) return callback(null, thread);
    });
};

const updateThread = (param, param2, callback) => {
    Thread.findByIdAndUpdate(param, { "$set": { "name": param2.name, "description": param2.description } }, {new: true}, (err, thread) => {
        if(thread) return callback(null, thread);
        return callback({Message: "Thread existiert nicht."}, null);
    });
};

const deleteThread = (param, callback) => {
    Thread.findByIdAndDelete(param, (err, thread) => {
        if(thread) return callback(null, thread);
        return callback({Message: "Thread existiert nicht."}, null);
    });
    
};

const findAllMessagesOfThread = (param, callback) => {
    Message.find({forumThreadID: param}, (err, msg) => {
        if(msg) return callback(null, msg);
        return callback({"Test": "test"}, null);
    });
};



module.exports = {
    findAllThreads,
    createThread,
    findThread,
    findThreadLogged,
    findThreadUser,
    updateThread,
    deleteThread,
    findAllMessagesOfThread
};
const Message = require('./ForumMessageModel');
const decode = require('jwt-decode');
const Thread = require('../forumThread/ForumThreadModel');

const findAllMessages = (callback) => {
    Message.find((err, msg) => {
        if (msg) return callback(null, msg);
        return callback({ Message: "Es gab Probleme..." }, null);
    });
};

const findMessage = (param, callback) => {
    Message.findById(param, (err, msg) => {
        if(msg) return callback(null, msg);
        return callback({Message: "Es gab Probleme..."}, null);
    })
};

const findThreadMessage = (param, callback) => {
    Message.find({ forumThreadID: param }, (err, msg) => {
        if (msg) return callback(null, msg);
        return callback({ Message: "Es gab Probleme..." }, null);
    });
};

const deleteMessage = (param, callback) => {
    Message.findByIdAndDelete(param, (err, msg) => {
        if (msg) return callback(null, msg);
        return callback({ Message: "Es gab Probleme..." }, null);
    });
};

const updateMessage = (param, param2, callback) => {
    Message.findByIdAndUpdate(param, { "$set": { "title": param2.title, "text": param2.text } }, {new: true}, (err, msg) => {
        if(msg) return callback(null, msg);
        return callback({ Message: "Es gab Probleme..." }, null);
    });
};

const createMessage = (param, res, callback) => {
    let threadID = param.body.forumThreadID;
    Thread.findById(threadID, (err, thread) => {
        if (!thread) return callback({ Message: "Ungültige ID..." }, null);
        let decodedTokenUserId = decode(param.header('authorization'));
        let msg = new Message({
            forumThreadID: param.body.forumThreadID,
            title: param.body.title,
            text: param.body.text,
            authorID: decodedTokenUserId.userID
        });
        msg.save((err, msg) => {
            if (msg) return callback(null, msg);
            return callback({ Message: "Es gab Probleme..." }, null);
        });
    });
};


module.exports = {
    findAllMessages,
    createMessage,
    findThreadMessage,
    deleteMessage,
    findMessage,
    updateMessage
};
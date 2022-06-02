const mongoose = require('mongoose');

const ForumMessageSchema = mongoose.Schema({
    forumThreadID: String,
    title: String,
    text: String,
    authorID: String
});

module.exports = mongoose.model("ForumMessage", ForumMessageSchema);
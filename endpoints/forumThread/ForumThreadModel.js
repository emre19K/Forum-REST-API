const mongoose = require('mongoose');


const ForumThreadSchema = mongoose.Schema({
   name: String,
   description: String,
   ownerID: String
});


module.exports = mongoose.model('ForumThread', ForumThreadSchema);
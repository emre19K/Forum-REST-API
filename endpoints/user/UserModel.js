const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    userID: { type: String, unique: true },
    userName: String,
    password: String,
    isAdministrator: { type: Boolean, default: false }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})


module.exports = mongoose.model("User", UserSchema);
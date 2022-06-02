const User = require('./UserModel');
const bcrypt = require('bcryptjs');


const findAllUser = (callback) => {
    User.find((err, user) => {
        if (err) return callback(err, null);
        return callback(null, user);
    });
};

const createUser = (param, callback) => {
    if (param.userID) {
        let user = new User(param);
        user.save((err, user) => {
            if (err) return callback({ Message: "User existiert bereits." }, null);
            return callback(null, user);
        });
    } else {
        return callback({ Message: "UserID fehlt." });
    }

};

const findUser = (param, callback) => {
    User.findOne({ userID: param }, (err, user) => {
        if (user) return callback(null, user);
        return callback({ Message: "User existiert nicht." }, null);
    });
};

const updateUser = (param1, param2, callback) => {
    if (param2.password) {
        bcrypt.hash(param2.password, 8, (err, pass) => {
            if (pass) {
                User.findOneAndUpdate({ userID: param1 }, { "$set": { "userID": param2.userID, "userName": param2.userName, "password": pass, "isAdministrator": param2.isAdministrator } }, { new: true }, (err, user) => {
                    if (user) return callback(null, user);
                    return callback({ Message: "User existiert nicht." }, null);
                });
            }
        });
    }else{
        User.findOneAndUpdate({ userID: param1 }, { "$set": { "userID": param2.userID, "userName": param2.userName, "password": param2.password, "isAdministrator": param2.isAdministrator } }, { new: true }, (err, user) => {
            if (user) return callback(null, user);
            return callback({ Message: "User existiert nicht." }, null);
        });
    }

};

const deleteUser = async (param, callback) => {
    User.findOneAndDelete({ userID: param }, (err, user) => {
        if (user) return callback(null, user);
        return callback({ Message: "User existiert nicht." }, null);
    });
};

// NEU
const createDefaultAdminOnStart = async (callback) => {
    User.findOne({ isAdministrator: true }, (err, admin) => {
        if (admin) {
            return callback(null, "Default-Admin: " + admin.userID);
        }
        const newAdmin = new User({
            userID: "admin",
            userName: "Default-Admin",
            password: "123",
            isAdministrator: true
        });

        newAdmin.save((err, admin) => {
            if (admin) return callback(null, "Default-Admin created.");
        });

    });
};



module.exports = {
    findAllUser,
    createUser,
    findUser,
    updateUser,
    deleteUser,
    createDefaultAdminOnStart
};


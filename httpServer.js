const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const PublicUserRoute = require('./endpoints/user/PublicUserRoutes');
const AuthenticationRoute = require('./endpoints/authentication/AuthenticationRoute');
const authenticationService = require('./endpoints/authentication/AuthenticationService');
const userService = require('./endpoints/user/UserServices');
const UserRoute = require('./endpoints/user/UserRoutes');
const ForumThreadRoute = require('./endpoints/forumThread/ForumThreadRoute');
const ForumMessageRoute = require('./endpoints/forumMessage/ForumMessageRoute');
const bodyParser = require('body-parser');
const database = require('./database/db');

// SERVERVARS
const app = express();
const port = 443;
const options = {
    key: fs.readFileSync(path.join(__dirname, "certificates", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "certificates", "server.cert"))
};

// MIDDLEWARES
app.use(bodyParser.json());
app.use('/users', authenticationService.authenticateTokenAndAdmin, UserRoute);
app.use('/forumThreads', ForumThreadRoute);
app.use('/publicUsers', PublicUserRoute);
app.use('/authenticate', AuthenticationRoute);
app.use('/forumMessages', ForumMessageRoute);

// DEFAULT ADMIN
userService.createDefaultAdminOnStart((err, admin) => {
    if (admin) console.log(admin);
});

// HTTPS
https.createServer(options, app).listen(port, () => {
    console.log("HTTPS Verbindung erfolgreich");
});

// DB CONNECTION
database.initDB((err, db) => {
    if (db) {
        console.log("Verbunden auf: " + db._connectionString);
    } else {
        console.log(err);
    }
});

/**
 * @version 1.0.0
 * @description Creating a module to break our application up. This module is used to deal with our routes. Required in server.js
 * @author Aaron Welsh <contact@aaron-welsh.co.uk>
 * 
 */
module.exports  = function(app, passport) {
    const path  = require("path");

    // Serve home page
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/', 'index.html'));
    });

};


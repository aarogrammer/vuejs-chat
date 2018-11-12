/**
 * @version 1.0.0
 * @description Real-time chat application using NodeJS, VueJS & Socket.io. This is the main file that we run with NodeJS.
 * @author Aaron Welsh <contact@aaron-welsh.co.uk>
 * 
 */
const express   = require("express");
const app       = express();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);
const port      = process.env.port | 8080;

app.use(express.static('public')); // Server static files

require('./server/routes.js')(app);
require('./server/sockets.js')(io);

// Start server 
http.listen(port, () => {
  console.log('App running on port ' + port);
});
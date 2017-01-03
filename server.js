/**
 * @version 1.0.0
 * @description Real-time chat application using NodeJS, VueJS & Socket.io. This is the main file that we run with NodeJS.
 * @author Aaron Welsh <contact@aaron-welsh.co.uk>
 * 
 */
const express   = require("express");
const app       = express();
const morgan    = require('morgan');
const http      = require('http').Server(app);
const io        = require('socket.io')(http);
const port      = process.env.port | 8080;

app.use(morgan('dev')); // Log HTTP information - 200, 404, 503 etc... Good for development.
app.use(express.static('public')); // Use static files from client

require('./server/routes.js')(app); // Include routes file
require('./server/sockets.js')(io); // Include sockets file

// Start server 
http.listen(port, function() {
  console.log('App running on port ' + port);
});
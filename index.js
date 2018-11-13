/**
 * @description Real-time chat application using NodeJS, VueJS & Socket.io. This is the main file that we run with NodeJS.
 * @author Aaron Welsh
 * 
 */
const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);
const port      = process.env.port | 8080;
const routes    = require('./src/server/routes');

app.use("/dist", express.static('dist')); // Server static files

require('./src/server/sockets.js')(io);

app.use('/', routes);

// Start server 
http.listen(port, () => {
  console.log(`🚀 App online at http://localhost:${port} 💬`);
});
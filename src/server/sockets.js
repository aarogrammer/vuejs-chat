/**
 * @description Create an event for socket to listen on.
 * @author Aaron Welsh
 * 
 */

const { DatabaseHelper } = require('./models/DatabaseHelper');
const { database_url, database_messages_collection } = require('../../build/env').database;

const databasehelper = new DatabaseHelper(database_url, database_messages_collection);
module.exports  = io => {
    // Handle socket.io connections
    io.on('connection', socket => {

        // Connected username that was passed from the client.
        const username = socket.handshake.query.username;
        console.log(`🚪 ${username} connected`);
        socket.broadcast.emit('connectedUser', username);


        socket.on('disconnect', () => {
            //log if user disconnected
            console.log(`❌ ${username} disconnected`);
            socket.broadcast.emit('disconnectedUser', username);

        });

        // Handle message sent
        socket.on('messageEvent', message => {
            console.log(`💬 ${message.username}: ${message.text}`)
            
            // Send message to all connected clients.
            io.emit('messageEvent', message);

            // Save message to MongoDB.
            databasehelper.create({
                username: message.username,
                text: message.text,
                ts: message.ts
            })
            .then(res => {
                console.log(`Message saved with ID ${res}`);
            })
            .catch(err => {
                console.error(err);
            });
        });
    });
};

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

        //log if user joined
        console.log('a user connected');
        socket.on('disconnect', () => {
            //log if user disconnected
            console.log('user disconnected');
        });

        // Handle message sent
        socket.on('messageEvent', message => {
            console.log(message)
            io.emit('messageEvent', message);
            databasehelper.create({
                text: message.text,
                ts: message.ts
            })
            .then(res => {
                console.log(`Message saved with ID ${res}`);
            })
            .catch(err => {
                console.error(err);
            })
        });
    });
};

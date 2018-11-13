/**
 * @description Create an event for socket to listen on.
 * @author Aaron Welsh
 * 
 */
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
            // console.log(`
            // Message: ${message.text}
            // Time: ${message.ts}
            // `);
            io.emit('messageEvent', message);
        });
    });
};

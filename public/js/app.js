/**
 * @version 1.0.0
 * @description Real-time chat application using NodeJS, VueJS & Socket.io. This is our client-side application using VueJS & Socket.io. We simply pass data to our server socket and bind the data to our client.
 * @author Aaron Welsh <contact@aaron-welsh.co.uk>
 * 
 */
// Init socket
const socket = io();
// Uncomment line below for debugging and refresh the application.
//localStorage.debug = '*';

// Init VueJS
const vue = new Vue ({
    el: '#app',
    //data we're passing to the DOM
    data: {
        message: null,
        messages: []
    },
    created: function () {
            socket.on('listenForMessage', function(message) {
                this.messages.push(message);
        }.bind(this));
    },
    
    // Add to our Vue instance
    methods: {
        // Emit form data to server socket
        send: function() {
            // Trying to not overcomplicate this, you should use proper validation.
            if(!this.message == "") {
                socket.emit('listenForMessage', this.message);            
                this.message = '';
            }
        }
    }
});

// Handle our socket client, checking their connection to give feedback
let input = document.getElementsByTagName("input")[0];
socket.on("disconnect", function() {
    console.log("Unable to connect to the server...");
    input.disabled = true;
    input.setAttribute("placeholder", "The application has went offline. Trying to reconnect...");
});

socket.on("connect", function() {
    console.log("Chat is online.");
    input.disabled = false;
    input.setAttribute("placeholder", "Type your message and press enter");
});
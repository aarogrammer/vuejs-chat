<template>
    <div>
        <section id="header">
            <div class="v-center">
                 <strong id="status"></strong>
            </div>
        </section>
        <section id="main-section">
            <div>

                <form v-on:submit.prevent="send">
                    <input v-model="message" type="text" placeholder="Type your message and press enter" />
                </form>
                <div id="chat-area">
                    <div class="group-item" v-for="message in messages" :key="message" v-text="message"></div>
                </div>
            
            </div>
        </section>
        <router-link to="/about">About</router-link>
    </div>
</template>
<script>
    import io from 'socket.io-client';

    const socket = io();

    export default {
        mounted: function() {
            this.connectionStatus();
        },
        created: function () {
            socket.on('messageEvent', function(message) {
                this.messages.push(message);
            }.bind(this));
        },
        data () {
            return { 
                message: null,
                messages: []
            }
        },
        methods : {

            send: function() {
                // Trying to not overcomplicate this, you should use proper validation.
                if(!this.message == '') {
                    socket.emit('messageEvent', this.message);            
                    this.message = '';
                }
            },
            connectionStatus: function() {
                // Handle our socket client, checking their connection to give feedback
                const input = document.getElementsByTagName('input')[0];
                const status = document.getElementById('status')
                socket.on('disconnect', function() {
                    console.log('Unable to connect to the server...');
                    input.disabled = true;
                    input.setAttribute('placeholder', 'The application has went offline. Trying to reconnect...');
                    status.innerText=`You're offline!`
                });

                socket.on('connect', function() {
                    console.log('Chat is online.');
                    input.disabled = false;
                    input.setAttribute('placeholder', 'Type your message and press enter');
                    status.innerText=`You're online!`
                });
            }

        }
    }
    
</script>
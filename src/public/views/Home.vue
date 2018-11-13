<template>
    <div class="pure-g">
        <div id="main-section" class="pure-u-1">
            <div class="pure-g">
                <div class="pure-u-1">
                    <form class="pure-form" v-on:submit.prevent="send">
                        <fieldset class="pure-group">
                            <textarea class="pure-input-1-3" v-model="message" v-on:keyup.enter="send" placeholder="Type your message and press enter"></textarea>
                        </fieldset>
                        <button type="submit" class="pure-button pure-input-1-5 pure-button-primary">Send</button>
                    </form>
                </div>
               
                <div id="chat-area">
                    <div class="group-item" v-for="message in messages" :key="message" v-text="message"></div>
                </div>
            
            </div>
        </div>
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

            send: function(event) {
                // Trying to not overcomplicate this, you should use proper validation.
                event.preventDefault()
                if(!this.message == '') {
                    socket.emit('messageEvent', this.message);            
                    this.message = '';
                }
            },
            connectionStatus: function() {
                // Handle our socket client, checking their connection to give feedback
                const input = document.getElementsByTagName('textarea')[0];
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
<style>

</style>

<template>
    <div class="pure-g">
        <div class="pure-u-1">
            <div class="chat-area" id="chat-area">
                <div class="user-message" v-for="message in messages" :key="message.message">
                    {{message.text}}
                    <small id="ts">{{moment(message.ts).fromNow()}}</small>
                </div>
            </div>
        </div>
        <div class="pure-u-1">
            <div>
                <div class="indicator" id="indicator"></div>
                <strong id="status"></strong>
            </div>
            <form class="pure-form" v-on:submit.prevent="send" id="message-form">
                <fieldset class="pure-group">
                    <input type="text" class="pure-input-1-3" id="message-textarea" v-model="message.text" v-on:keyup.enter="send" placeholder="Type your message and press enter" />
                </fieldset>
                <button type="submit" class="pure-button pure-input-1-5 pure-button-primary">Send</button>
            </form>
        </div>
        
    </div>
</template>
<script>

    import io from 'socket.io-client';
    import moment from 'moment';
    
    const socket = io();

    export default {
        mounted: function() {
            this.connectionStatus();
            this.getMessages();
        },
        created: function() {
            
            socket.on('messageEvent', function(message) {
                this.getMessages();
            }.bind(this));
            
        },
        data () {
            return { 
                message: {
                    text: null,
                    ts: null
                },
                messages: [],
                moment
            }
        },

        methods : {

            send: function(event) {

                event.preventDefault();
                if(!this.message.text == '') {
                    const newMessage = {
                        text: this.message.text,
                        ts: new Date(),
                    };
                    socket.emit('messageEvent', newMessage); 
                    this.message.text = '';
                }
                
            },
            getMessages: async function() {
                try {
                    const axios = await this.$http.get('/api/messages');
                    this.messages = axios.data;
                    
                } catch (err) {
                    console.error(this.$http, `Err: ${ err }`);
                }
            },
            connectionStatus: function() {
                // Handle our socket client, checking their connection to give feedback
                const input = document.getElementById('message-textarea');
                const status = document.getElementById('status');
                const indicator = document.getElementById('indicator');
                const offlineMessage = 'The application has went offline. Trying to reconnect...';

                socket.on('disconnect', () => {
                    input.disabled = true;
                    input.setAttribute('placeholder', offlineMessage);
                    status.innerText = offlineMessage;
                    indicator.style.background = '#dc3545';
                });

                socket.on('connect', () => {
                    input.disabled = false;
                    input.setAttribute('placeholder', 'Type your message and press enter');
                    status.innerText = 'Online';
                    indicator.style.background = '#42b983'
                });
            }

        }
    }
    
</script>
<style>
    .chat-area {
        height: 300px;
        width: 100%;
        outline: 1px solid #cccccc;
        overflow-y: scroll;
    }
    .indicator {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: red;
        border-radius: 50%;
    }
    form#message-form {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>

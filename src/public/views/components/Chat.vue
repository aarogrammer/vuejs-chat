<template>
    <div class="pure-g">
        
        <div class="pure-u-1">
            <div class="chat-area" id="chat-area">
                <div class="user-message" v-for="message in messages" :key="message.message">
                    {{message.username}}: {{message.text}}
                    <small id="ts">{{moment(message.ts).fromNow()}}</small>
                </div>
            </div>
        </div>

        <div class="pure-u-1">
            
            <div>

                <div class="indicator" id="indicator"></div>
                <strong id="status"></strong>
                <div id="user-connectivity"></div>

                <div class="online-users">
                    <h2>Connected Users</h2>
                    <div v-for="user in userList" :key="user">
                        <strong>{{user}}</strong>
                    </div>
                </div>

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

    export default {
        props: ['userData'],
        mounted: function() {
            
            this.getMessages();
            this.connectionStatus();
            this.socketEvents();
            
        },
        data () {
            return { 
                message: {
                    text: null,
                    ts: null
                },
                messages: [],
                moment: this.$moment,
                username: this.userData.name,
                socket: this.$io.connect('', {query: `username=${this.userData.name}`})
            }
        },
        computed: {
            userList () {
                return this.$store.getters.getUserList;
            }
        },
        methods: {

            socketEvents: function() {

                this.socket.on('messageEvent', function(message) {
                    this.getMessages();
                }.bind(this));

                this.userConnectivity();

                this.socket.on('connectedUserList', (list) => {
                    this.$store.commit('updateUserList', list);
                });

            },
   
            userConnectivity: function() {

                const userConnectivityEl = document.getElementById('user-connectivity');
                this.socket.on('connectedUser', function(user) {
                    userConnectivityEl.innerText = `User ${user} has joined the chat!`;
                    this.clearUserConnectivity(userConnectivityEl, 5000);
                }.bind(this));

                this.socket.on('disconnectedUser', function(user) {
                    userConnectivityEl.innerText = `User ${user} has left the chat!`;
                    this.clearUserConnectivity(userConnectivityEl, 5000);
                }.bind(this));

            },
            clearUserConnectivity: function(el, time) {
                setTimeout(() => {
                    el.innerText = '';
                }, time);
            },
            send: function(event) {

                event.preventDefault();
                if(!this.message.text == '') {
                    const newMessage = {
                        username: this.username,
                        text: this.message.text,
                        ts: new Date(),
                    };
                    this.socket.emit('messageEvent', newMessage); 
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

                this.socket.on('disconnect', () => {
                    input.disabled = true;
                    input.setAttribute('placeholder', offlineMessage);
                    status.innerText = offlineMessage;
                    indicator.style.background = '#dc3545';
                });

                this.socket.on('connect', () => {
                    input.disabled = false;
                    input.setAttribute('placeholder', 'Type your message and press enter');
                    status.innerText = 'Online';
                    indicator.style.background = '#42b983';
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

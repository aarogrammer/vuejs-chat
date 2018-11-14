<template>
    <div class="pure-g">
        <div class="pure-u-1">

            <form v-if="!user.set" class="pure-form" v-on:submit.prevent="setUsername" id="username-form">
                <strong>Pick a name</strong>            
                <fieldset class="pure-group">
                    <input type="text" class="pure-input-1-3" id="username" v-model="user.name" placeholder="Your username" />
                </fieldset>
            </form>
            <button v-on:click="randomUsername" v-if="!user.set" type="submit" class="pure-button pure-input-1-5 pure-button-primary">Or generate a random username!</button>


            <strong v-if="user.set">Hi, {{user.name}}</strong>
            <chat v-if="user.set" :user-data="user"></chat>

        </div>
    </div>
</template>
<script>

    import Chat from './components/Chat.vue';

    export default {

        components: {
            'chat' : Chat
        },
        mounted: function() {

            this.checkUsername(this.user.name);

        },
        data () {

            return { 
               user: {
                   name: '',
                   set: false
               }
            }

        },
        methods: {

            setUsername: function(event) {

                event.preventDefault();
                this.saveUsername(this.user.name);

            },
            saveUsername: function(username) {

                const date = new Date;
                date.setDate(date.getDate() + 7);
                document.cookie = "username="+username+"; expires=" + date + ";";
                this.user.set = true;
                this.user.name = username;

            },
            checkUsername: function(username) {

                const usernameCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                if(usernameCookie) {
                    this.user.set = true;
                    this.user.name = usernameCookie;
                }

            },
            randomUsername: function() {

                // Random username consisting of 'anon' and 5 random numbers.
                const random = Math.floor(Math.random()*90000) + 10000;
                const username = `anon${random}`;
                this.saveUsername(username);


            }
        }

    }
    
</script>
<style>

</style>

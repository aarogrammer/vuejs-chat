<template>
    <div class="pure-g">
        <div class="pure-u-1">
            <chat></chat>
        </div>
    </div>
</template>
<script>

    import Chat from './components/Chat.vue';

    export default {
        components: {
            'chat' : Chat
        },
        data () {
            return { 
               
            }
        },

    }
    
</script>
<style>

</style>

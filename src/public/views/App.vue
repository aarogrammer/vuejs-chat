<template>
    <div>

        <main-header></main-header>

        <transition>
            <router-view id="main"></router-view>
        </transition>

        <main-footer></main-footer>

    </div>
</template>
<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    export default {
        components: {
            'main-header' : Header,
            'main-footer' : Footer
        },
        data () {
            return {
            }
        },
        mounted() {
        },
        updated() {
        }
    }
</script>
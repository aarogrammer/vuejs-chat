/**
 * @name Main
 * @description File that webpack watches and outputs to bundle.js (see webpack.config.js)
 * @author Aaron Welsh
 */

// Import Vue and Vue Loader
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


import app from '../views/App.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// Set up routes with relevant views/components
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home},
        { path: '/about', component: About}
    ]
});


new Vue({
    el: '#app',
    router,
    render: h => h(app)
});
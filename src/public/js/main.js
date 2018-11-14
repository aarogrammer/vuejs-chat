/**
 * @name Main
 * @description File that webpack watches and outputs to bundle.js (see webpack.config.js)
 * @author Aaron Welsh
 */

// Core imports
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';

const axios = Axios.create({
    baseURL: '/',
});

Vue.use(VueRouter);

// Prototypes - Utilities we're probably going to use over many components.
Vue.prototype.$http = axios;
Vue.prototype.$io = io;
Vue.prototype.$moment = moment;


import app from '../views/App.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// Set up routes with relevant views/components
const router = new VueRouter({
    // mode: 'history',
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
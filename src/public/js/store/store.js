import Vuex from 'vuex';
import UserList from './modules/userList';

import Env, { app } from '../../../../build/env';
const env = (app.mode == 'production' ? true : false);

console.log(env)
export default new Vuex.Store({
    modules: {
        UserList
    },
    strict: false
});
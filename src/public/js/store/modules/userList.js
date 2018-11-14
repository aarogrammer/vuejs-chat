const state = {
    userList: ''
};

const mutations = {
    updateUserList: ( state, value ) => {
        state.userList = value;
    }
};

const actions = {
    updateUserList: (context, value) => {
        context.commit('updateUserList', value)
    }
};

const getters = {
    getUserList: (state) => {
        return state.userList;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
}
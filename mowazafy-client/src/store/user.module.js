import UsersService from '../services/user.service';

export const user = {
    namespaced: true,
    state: {
        status: "",
        users: []
    },
    getters: {
        users: state => state.users,
    },
    actions: {
        getUsers({ commit }) {
            return UsersService.getAll().then(users => {
                commit("getUsers_success", users.data);
                return Promise.resolve(users);
            })
                .catch(err => {
                    commit("getUsers_error");
                    return Promise.reject(err);
                })
        }
    },
    mutations: {
        getUsers_success(state, data) {
            state.users = data;
            state.status = "success";
        },
        getUsers_error(state) {
            state.status = "error";
        },
    }
};
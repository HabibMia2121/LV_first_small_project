import { createStore } from 'vuex'
import router from '../router';

const store = createStore({
    state: {
    //   message:'learn vue js',
      user:{},
      authenticated: false,
    },
    getters: {
    //   getMessage(state){
    //     return state.message;
    //   },
      getUser(state){
        return state.user;
      },
      getAuthentcated(state){
        return state.authenticated;
      }
    },
    mutations:{
        SET_USER(state,data){
            state.user = data;
        },
        SET_AUTHENTCATED(state,data){
            state.authenticated = data;
        },
    },
    actions:{
        authUser ({ commit, dispatch }) {
            return axios.get('/api/user').then((response) => {
                commit('SET_AUTHENTCATED', true)
                commit('SET_USER', response.data)
                localStorage.setItem("auth", true);

                if(router.currentRoute.name !== null){
                    router.push({ name: 'dashboard' })
                };

            }).catch(() => {
                commit('SET_AUTHENTCATED', false)
                commit('SET_USER', null)
                localStorage.removeItem("auth");

                if(router.currentRoute.name !== 'login'){
                    router.push({ name: 'login' })
                };
            })
        },
    }
})

export default store;

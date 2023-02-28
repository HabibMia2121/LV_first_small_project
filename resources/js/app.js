import './bootstrap';

import { createApp } from 'vue';
import router from './router';
import '../sass/app.scss';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
window.Swal = Swal;

import store from './store/index';
import AppHeader from './components/Header.vue';

/*-----------------navigation guards use start here ------------ */
// Auth
function isLoggedIn() {
    return store.getters.getAuthentcated;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn()) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (isLoggedIn()) {
            next({
                name:'dashboard',
            })
        } else {
            next()
        }
    }else {
        next()
    }
})
/*-----------------navigation guards use end here------------ */

let auth = localStorage.getItem('auth')
if(auth){
    store.dispatch('authUser').then(()=>{
        const app = createApp({});

        app.component('AppHeader',AppHeader);

        app.use(router);
        app.use(store);
        app.mount('#app');
    });
}else{
    const app = createApp({});
    app.component('AppHeader',AppHeader);

    app.use(router);
    app.use(store);
    app.mount('#app');
}


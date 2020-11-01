import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/home.vue';
import About from './views/about.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/about',
            component: About,
            name: 'About'
        }
    ]
});

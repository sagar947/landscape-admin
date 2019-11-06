import Vue from 'vue';
import Router from 'vue-router';
import globalRoutes from './routes/globalRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import employerRoutes from './routes/employerRoutes.js';

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../../ui/pages/home/Home.vue')
    },
    ...globalRoutes,
    ...adminRoutes,
    ...employerRoutes,
    {
        path: '*',
        name: 'not-found',
        component: () => import('../../ui/pages/404/NotFound.vue')
    }
]

export default function createRouter() {
    return new Router({
        mode: 'history',
        routes
    })
}
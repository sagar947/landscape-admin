const adminRoutes = [
    {
        path: '/clients',
        name: 'clients',
        component: () => import('../../../ui/pages/clients/Clients.vue')
    }, {
        path: '/users',
        name: 'users',
        component: () => import('../../../ui/pages/users/Users.vue')
    }
];

export default adminRoutes;
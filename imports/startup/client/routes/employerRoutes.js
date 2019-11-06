const employerRoutes = [
    {
        path: '/projects',
        name: 'projects',
        component: () => import('../../../ui/pages/projects/Projects.vue')
    }
];

export default employerRoutes;
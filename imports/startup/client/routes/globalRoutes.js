const globalRoutes = [{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../../ui/pages/dashboard/Dashboard.vue')
}, {
    path: '/tasks/:projectId',
    name: 'projectTasks',
    component: () => import('../../../ui/pages/tasks/Tasks.vue')
}, {
   path: '/task/:taskId',
   name: 'taskDetails',
   component: () => import('../../../ui/pages/tasks/TaskDetails.vue') 
}];

export default globalRoutes;
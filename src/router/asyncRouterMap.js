export default [
    {
        path: '/attendance',
        name: 'Attendance',
        meta: {
            auth: ['admin', 'boss', 'administration'],
        },
        component: () => import('@/views/AuthView/AuthAttendance.vue'),
    },
    {
        path: '/salary',
        name: 'Salary',
        meta: {
            auth: ['boss', 'finance'],
        },
        component: () => import('@/views/AuthView/AuthSalary.vue'),
    },
    {
        path: '*',
        name: 'NotFound',
        meta: { auth: ['boss', 'finance', 'admin', 'administration', 'user'] },
        component: () => import('@/views/NotFound.vue'),
    },
];

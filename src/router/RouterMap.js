export default [
    {
        path: '/',
        name: 'Layout',
        component: () => import('../views/LayOut.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/index/HomeIndex'),
            },
            {
                path: '/orders/list',
                name: 'orders_list',
                component: () => import('../views/orders/OrdersList'),
                meta: {
                    bread: [
                        { name: '订单管理', url: '/orders' },
                        { name: '订单列表', url: '/orders/list' },
                    ],
                },
            },
            {
                path: '/waybill/list',
                name: 'waybill_list',
                component: () => import('../views/waybill/WaybillList'),
                meta: {
                    bread: [
                        { name: '运单管理', url: '/waybill' },
                        { name: '运单列表', url: '/waybill/list' },
                    ],
                    keepAlive: true,
                },
            },
            {
                path: '/waybill/list/Detail',
                name: 'waybill_Detail',
                component: () => import('../views/waybill/WaybillDetail'),
                meta: {
                    bread: [
                        { name: '运单管理', url: '/waybill' },
                        { name: '运单列表', url: '/waybill/list' },
                        { name: '运单详情', url: '/waybill/list/Detail' },
                    ],
                },
            },
            {
                path: '/depart/data',
                name: 'waybill_list_data',
                component: () => import('../views/depart/DepartData'),
                meta: {
                    bread: [
                        { name: '发车管理', url: '/depart' },
                        { name: '发车数据单', url: '/depart/data' },
                    ],
                },
            },
            {
                path: '/waybill/in',
                name: 'waybill_list_data',
                component: () => import('../views/waybill/WaybillEnter'),
                meta: {
                    bread: [
                        { name: '运单管理', url: '/waybill' },
                        { name: '运单录入', url: '/waybill/in' },
                    ],
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginVue.vue'),
    },
];

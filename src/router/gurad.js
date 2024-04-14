import router from './index';
import { getToken } from '@/utils/auth';
import asyncRoutes from './asyncRouterMap';
import store from '@/store';
router.beforeEach(async (to, from, next) => {
    const hasToken = getToken();
    if (hasToken) {
        await store.dispatch('getRole');
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            //动态添加路由，如果访问需要权限的路由，再添加路由
            if (to.name == null) {
                //筛选出角色对应所拥有的路由表
                let f = asyncRoutes.filter(item => item.meta.auth.includes(store.state.role));
                //添加路由
                for (let i = 0; i < f.length; i++) {
                    router.addRoute(f[i]);
                }
                next({ ...to, replace: true });
            } else {
                next();
            }
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({ path: '/login' });
        }
    }
});

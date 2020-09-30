import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AdminLayout from '../views/Layout/AdminLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/backoffice',
    name: 'Backoffice',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
    children: [
      {
        path: '/backoffice/user',
        name: 'user',
        component: () => import('../views/User.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('x-token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const isAdmin = localStorage.getItem('X-Admin');
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (isAdmin === 'true') {
          next();
        } else {
          next({ name: 'Login' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'userboard' });
    }
  } else {
    next();
  }
});

export default router;

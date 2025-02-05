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
        component: () => import('../views/User/list.vue'),
      },
      {
        path: '/backoffice/user/add',
        name: 'adduser',
        component: () => import('../views/User/add.vue'),
      },
      {
        path: '/backoffice/user/:id',
        name: 'edituser',
        component: () => import('../views/User/edit.vue'),
      },
      {
        path: '/backoffice/product/',
        name: 'product',
        component: () => import('../views/Product/list.vue'),
      },
      {
        path: '/backoffice/product/add',
        name: 'addproduct',
        component: () => import('../views/Product/add.vue'),
      },
      {
        path: '/backoffice/product/:id',
        name: 'editproduct',
        component: () => import('../views/Product/edit.vue'),
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

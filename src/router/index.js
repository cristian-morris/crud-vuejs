import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import AddUser from '@/views/AddUser.vue'
import EditUser from '@/views/EditUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Register,
    },
    {
      path: '/profile',
      name: 'Profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/add-user',
      name: 'Add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AddUser,
    },
    {
      path: '/edit-user/:id',
      name: 'EditUser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EditUser,
      props: true,
    },
  ]
})



// Ruta de protección para páginas que requieren autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router


// codigo de autenticacion
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
// import Login from '../views/Login.vue';
// import Register from '../views/Register.vue';
// import Profile from '../views/Profile.vue';
// import AddUser from '../views/AddUser.vue';

// // Guardias de navegación para proteger rutas
// function isAuthenticated() {
//   return !!localStorage.getItem('token'); // Verifica la existencia del token en el almacenamiento local
// }

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('../views/Home.vue'), // Carga diferida
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('../views/Login.vue'), // Carga diferida
//   },
//   {
//     path: '/register',
//     name: 'Register',
//     component: () => import('../views/Register.vue'), // Carga diferida
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: () => import('../views/Profile.vue'), // Carga diferida
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/add-user',
//     name: 'Add',
//     component: () => import('../views/AddUser.vue'), // Carga diferida
//   },
//   {
//     path: '/edit-user/:id',
//     name: 'EditUser',
//     component: () => import('../views/EditUser.vue'), // Carga diferida
//     props: true,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// // Guardia de navegación global
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated()) {
//     // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
//     next({ name: 'Login' });
//   } else {
//     // De lo contrario, continúa con la navegación
//     next();
//   }
// });

// export default router;

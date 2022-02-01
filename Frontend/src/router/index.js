import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Accueil from '../views/Accueil.vue'

  const routes = [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/Inscription',
      name: 'Inscription',
      
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '../views/Signup.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path:'/User/:id',
      name: 'User',
      component: () => import('../views/Profil.vue')
    },
    {
      path: '/Profil',
      name: 'Profil',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Profil.vue')
    },
    {
      path:'/post/:id',
      name: 'Post',
      component:() => import('../views/Profil.vue')
    },
    {
      path:'/comment',
      name: 'Commentaire',
      component:() => import('../views/Home.vue')
    },
    {
      path: '/Connexion',
      name: 'Connexion',
      
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '../views/Signin.vue')
    },
    {
      path: '/Modification/:id',
      name: 'Modification',
      
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '../views/Modifier.vue')
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
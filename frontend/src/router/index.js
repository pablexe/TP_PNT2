import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import SystemView from '../views/SystemView.vue'
import Shoppingcar from '../views/Shoppingcar.vue'
import LoginView  from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      
      path: '/system',
      name: 'systemview',
      component: SystemView,
      meta:{ RequireAuth: true }
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Shoppingcar
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/users',
      name: 'usersview',
      component: UserView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach( (to,from,next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if( to.matched.some(r => r.meta.RequireAuth) && !usuarioLog ) {
  next('/')
  }
  next()
  })
  

export default router

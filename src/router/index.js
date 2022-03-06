import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
// import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DefaultPage',
    component: HomePage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/create',
    name: 'CreatePage',
    component: () => import('@/views/CreatePage.vue')
  },
  {
    path: '/edit',
    name: 'EditPage',
    component: () => import('@/views/EditPage.vue')
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('@/views/AdminPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'CreatePage' || to.name === 'AdminPage') && !localStorage.getItem('access_token') && this.$store.state.userProfile.role !== 'Admin') {
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Register') && localStorage.getItem('access_token')) {
    next({ name: 'HomePage' })
  } else {
    next()
  }
})

export default router

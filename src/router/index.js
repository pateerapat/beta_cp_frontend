import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '../components/Welcome'
import RegisterPage from '../components/Register'
import LoginPage from '../components/Login'
import HomePage from '../components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
  ]
})

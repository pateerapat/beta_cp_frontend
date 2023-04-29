import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '../components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    }
  ]
})

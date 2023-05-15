import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '../components/Welcome'
import RegisterPage from '../components/Register'
import LoginPage from '../components/Login'
import HomePage from '../components/Home'
import CardPackStore from '../components/CardPackStore'
import InventoryCard from '../components/InventoryCard'
import InventoryCardPack from '../components/InventoryCardPack'
import CollectionHall from '../components/CollectionHall'
import Notification from '../components/Notification'
import UsersHall from '../components/UsersHall'
import UserPage from '../components/UserPage'

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
    },
    {
      path: '/store',
      name: 'store',
      component: CardPackStore
    },
    {
      path: '/inventory-card',
      name: 'inventory-card',
      component: InventoryCard
    },
    {
      path: '/inventory-card-packs',
      name: 'inventory-card-packs',
      component: InventoryCardPack
    },
    {
      path: '/collection-hall',
      name: 'collection-hall',
      component: CollectionHall
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    },
    {
      path: '/users-hall',
      name: 'users-hall',
      component: UsersHall
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserPage
    }
  ]
})

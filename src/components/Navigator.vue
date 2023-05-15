<template>
  <div class="container ff-chonburi">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid px-5 py-4">
        <a class="navbar-brand pe-5 ff-chonburi fs-2" href="/">BETA</a>
        <div class="collapse navbar-collapse">
          <ul v-if="token" class="navbar-nav me-auto">
            <li class="nav-item dropdown px-3">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Inventory
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/inventory-card">Cards</a></li>
                <li><a class="dropdown-item" href="/inventory-card-packs">Card Packs</a></li>
              </ul>
            </li>
            <li class="nav-item px-3">
              <a class="nav-link fw-medium" href="/collection-hall">Collection Hall</a>
            </li>
            <li class="nav-item px-3">
              <a class="nav-link fw-medium" href="/store">Store</a>
            </li>
            <li class="nav-item px-3">
              <a class="nav-link fw-medium" href="/notification">Notification</a>
            </li>
          </ul>
          <ul v-if="!token" class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link fw-medium px-3" href="/login">Login</a>
            </li>
            <li class="nav-item text-white">
              <button class="nav-link fw-medium px-3">|</button>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-medium px-3" href="/register">Register</a>
            </li>
          </ul>
          <ul v-if="token" class="navbar-nav ms-auto">
            <li class="nav-item">
              <a :href="`/user/${user_id}`" class="nav-link fw-medium px-3 text-end">
                {{name}}<br />
                <span class="fs-5">{{moonstone}}</span> <i class="fa-solid fa-gem fa-xs ps-2"></i>
              </a>
            </li>
            <li class="nav-item text-white">
              <button class="nav-link fw-medium px-3">|</button>
            </li>
            <li class="nav-item">
              <button @click="logout()" class="nav-link fw-medium px-3">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import utils from '../services/utils'
import axios from 'axios'
import UserService from '../services/usersService'
export default {
  async created () {
    if (this.token) {
      const result = (await UserService.funcGetUser(this.token)).data
      if (result.errors) {
        console.log(result.errors)
      } else {
        this.user_id = result.user_id
        this.name = result.username
        localStorage.setItem('user_id', result.user_id)
        this.moonstone = result.moonstone
        this.backend_path = utils.getBackendPath()
      }
    }
  },
  props: ['token'],
  data () {
    return {
      name: null,
      user_id: null,
      moonstone: null,
      backend_path: null
    }
  },
  methods: {
    async logout () {
      await axios({
        method: 'POST',
        url: `${this.backend_path}/api/logout/`,
        headers: {
          authorization: `Token ${this.token}`
        }
      })
      localStorage.removeItem('tokenDetail')
      location.reload()
    }
  }
}
</script>

<style scoped>
</style>

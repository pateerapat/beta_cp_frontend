<template>
  <div class="container">
    <nav class="navbar navbar-expand navbar-dark bg-dark vh-10">
      <div class="container-fluid px-5 py-4">
        <a class="navbar-brand pe-5 ff-chonburi fs-2" href="/">BETA</a>
        <div class="collapse navbar-collapse">
          <!-- <ul class="navbar-nav me-auto">
            <li class="nav-item px-3">
              <a class="nav-link fw-medium" href="/users">User</a>
            </li>
          </ul> -->
          <ul v-if="!token" class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link fw-medium px-3" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-medium px-3" href="/register">Register</a>
            </li>
          </ul>
          <ul v-if="token" class="navbar-nav ms-auto">
            <li class="nav-item">
              <button class="nav-link fw-medium px-3">{{name}}</button>
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
import axios from 'axios'
import UserService from '../services/usersService'
export default {
  async created () {
    if (this.token) {
      const result = (await UserService.funcGetUser(this.token)).data
      if (result.errors) {
        console.log(result.errors)
      } else {
        this.name = result.username
      }
    }
  },
  props: ['token'],
  data () {
    return {
      name: null
    }
  },
  methods: {
    async logout () {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/logout/',
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

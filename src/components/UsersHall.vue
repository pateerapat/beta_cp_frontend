<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">USERS HALL</h1>
        <p>All users ever created with us.</p>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div v-for="user in users" v-bind:key="user.id" class="col-md-12 mt-3 mb-3">
          <a class="text-decoration-none" :href="`/user/${user.id}`">
            <div class="card px-5 py-4">
              <div class="row">
                <div class="col-md-12">
                  <h3 class="ff-chonburi pt-1">
                    {{user.name}}
                  </h3>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import UserService from '../services/usersService'
export default {
  async created () {
    utils.userAuthenticator(this.$router, 'home')
    const result = (await UserService.funcGetAllUsers()).data
    this.users = result.users
  },
  data () {
    return {
      users: null
    }
  }
}
</script>

<style scoped>
</style>

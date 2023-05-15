<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">NOTIFICATION</h1>
        <p>Someone just got something? Ooh! interesting.</p>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div v-for="(notification, index) in notifications" v-bind:key="index" class="col-md-12 mt-3 mb-3">
          <div class="card px-5 py-4">
            <div class="row">
              <div class="col-md-1">
                <i class="fa-solid fa-bullhorn fa-2xl pt-4"></i>
              </div>
              <div class="col-md-9">
                <h5 class="ff-chonburi pt-1">
                  {{notification.username}}
                  <span class="ff-montserrat px-3">just got</span>
                  {{notification.character_name}}
                  <i class="fa-solid fa-diamond fa-xl" :style="[{color: notification.rating_color}]"></i>
                  ({{notification.character_type}})<br />
                  <span class="ff-montserrat pe-3">from unsealing</span>
                  {{notification.card_pack_name}}
                </h5>
                <h5 class="mt-5 pt-5">{{notification.time}}</h5>
              </div>
              <div class="col-md-2 text-end">
                <img width="100" :src="`${backend_path}/media${notification.character_image}`">
              </div>
            </div>
          </div>
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
    const result = (await UserService.funcGetAllNotification()).data
    this.notifications = result.notifications
    this.backend_path = utils.getBackendPath()
  },
  data () {
    return {
      notifications: null,
      backend_path: null
    }
  }
}
</script>

<style scoped>
</style>

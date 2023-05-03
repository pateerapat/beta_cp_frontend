<template>
  <div class="container">
    <div class="container-fluid vh-90 bg-main px-5 py-4">
      <div class="row mt-5 pt-4">
        <div class="col-md-5 ps-5">
          <img width="550" src="../assets/deku-welcome-page.png">
        </div>
        <div class="col-md-6 ps-5">
          <div class="row">
            <div class="col-md-12">
              <h1>Welcome to</h1>
              <h1 class="ff-chonburi fs-logo">BETA</h1>
              <p>
                BETA is a continuously and aimlessly
                anime-based gacha games. created for a group of friends
                with the same interest of capturing their most favorite characters.
                Variety of gameplay possibility will be added from all the requests
                that will be given in the future. Hope you all enjoy!
              </p>
            </div>
            <div class="col-md-12">
              <a class="btn btn-secondary fw-bold fs-5 w-25 py-4" href="/login">
                LOGIN
              </a>
              <a class="btn btn-dark fw-bold fs-5 w-50 py-4" href="/register">
                REGISTER
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
export default {
  created () {
    utils.guestAuthenticator(this.$router)
  }
}
</script>

<style scoped>
</style>

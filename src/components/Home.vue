<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">HOME</h1>
        <p>Just a homepage nothing else, Go on.</p>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/inventory-card">
            <div class="card text-center p-5">
              <i class="fa-solid fa-diamond fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Your Cards</h4>
            </div>
          </a>
        </div>
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/inventory-card-packs">
            <div class="card text-center p-5">
              <i class="fa-solid fa-box-archive fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Your Card Packs</h4>
            </div>
          </a>
        </div>
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/store">
            <div class="card text-center p-5">
              <i class="fa-solid fa-cart-plus fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Store</h4>
            </div>
          </a>
        </div>
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/collection-hall">
            <div class="card text-center p-5">
              <i class="fa-solid fa-landmark fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Hall</h4>
            </div>
          </a>
        </div>
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/notification">
            <div class="card text-center p-5">
              <i class="fa-solid fa-bullhorn fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Notification</h4>
            </div>
          </a>
        </div>
        <div class="col-md-4 mt-3 mb-3">
          <a class="text-decoration-none" href="/users-hall">
            <div class="card text-center p-5">
              <i class="fa-solid fa-people-arrows fa-2xl pt-4"></i>
              <h4 class="ff-chonburi pt-5">Users Hall</h4>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import CardPack from '../components/CardPack.vue'
import PurchaseToast from '../components/PurchaseToast.vue'
export default {
  components: {
    CardPack,
    PurchaseToast
  },
  created () {
    utils.userAuthenticator(this.$router, 'home')
  }
}
</script>

<style scoped>
  .home-selection-size {
    height: 300px;
  }
</style>

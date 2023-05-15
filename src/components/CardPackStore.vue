<template>
  <div class="container">
    <PurchaseToast/>
    <PurchaseFailToast />
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">STORE</h1>
        <p>Select your packs to purchase from the variety of selection below.</p>
      </div>

      <div v-if="pack_by_event.length" class="row mt-4 bg-dark text-white p-3">
        <h1 class="ff-chonburi">Event Pack</h1>
      </div>
      <div v-if="pack_by_event.length" class="row mt-5 mx-1 gx-5">
        <div v-for="event in pack_by_event" v-bind:key="event.id" class="col-md-3 mb-5">
          <a class="text-decoration-none text-black">
            <CardPack :pack_info="event" is_inventory="false" is_readonly="false" />
          </a>
        </div>
      </div>

      <br v-if="pack_by_event.length"/>
      <br v-if="pack_by_event.length"/>

      <div class="row mt-5 bg-dark text-white p-3">
        <h1 class="ff-chonburi">Default Pack</h1>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div v-for="custom in pack_by_custom" v-bind:key="custom.id" class="col-md-3 mb-5">
          <a class="text-decoration-none text-black">
            <CardPack :pack_info="custom" is_inventory="false" is_readonly="false" />
          </a>
        </div>
      </div>

      <br/>
      <br/>
      <div class="row mt-5 bg-dark text-white p-3">
        <h1 class="ff-chonburi">Series Pack</h1>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div v-for="serie in pack_by_series" v-bind:key="serie.id" class="col-md-3 mb-5">
          <a class="text-decoration-none text-black">
            <CardPack :pack_info="serie" is_inventory="false" is_readonly="false" />
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import UserService from '../services/usersService'
import CardPack from '../components/CardPack.vue'
import PurchaseToast from '../components/PurchaseToast.vue'
import PurchaseFailToast from '../components/PurchaseFailToast.vue'
export default {
  components: {
    CardPack,
    PurchaseToast,
    PurchaseFailToast
  },
  data () {
    return {
      pack_by_series: [],
      pack_by_event: [],
      pack_by_custom: []
    }
  },
  async created () {
    utils.userAuthenticator(this.$router, 'home')
    const result = (await UserService.funcGetShop()).data
    this.pack_by_series = result.pack_by_series
    this.pack_by_event = result.pack_by_event
    this.pack_by_custom = result.pack_by_custom
  }
}
</script>

<style scoped>
</style>

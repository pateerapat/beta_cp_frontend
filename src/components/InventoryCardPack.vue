<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">YOUR PACKS</h1>
        <p>Storage for your packs collection.</p>
      </div>

      <div class="row mt-5 mx-1 gx-5">
        <div v-for="pack in card_packs" v-bind:key="pack.id" class="col-md-3 mb-5">
          <a class="text-decoration-none text-black">
            <CardPack :current_packs="card_packs" :pack_info="pack" is_inventory="true" is_readonly="false" />
          </a>
        </div>
        <div v-if="!card_packs.length" class="card mb-5 py-4">
          No packs in your inventory. Buy one bro.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import UserService from '../services/usersService'
import CardPack from '../components/CardPack.vue'
export default {
  components: {
    CardPack
  },
  data () {
    return {
      card_packs: []
    }
  },
  async created () {
    utils.userAuthenticator(this.$router, 'home')
    const userId = localStorage.getItem('user_id')
    const result = (await UserService.funcGetUserCardPack(userId)).data
    this.card_packs = result.card_packs
  }
}
</script>

<style scoped>
  .overlay {
    z-index: 9;
  }
</style>

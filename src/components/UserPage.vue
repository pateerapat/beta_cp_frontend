<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">{{userData.name}} ({{userData.moonstone}} <i class="fa-solid fa-diamond fa-xs"></i>)</h1>
        <p>Showing your user badge.</p>
      </div>
      <div class="row mt-5 mx-1 gx-5">
        <div class="col-md-3 mb-5">
          <h3 class="ff-chonburi fw-bold">FAV | 01</h3>
          <a class="text-decoration-none text-black">
            <CharacterCard :card_info="userData.favorite_one" no_hover="true" />
          </a>
        </div>
        <div class="col-md-3 mb-5">
          <h3 class="ff-chonburi fw-bold">FAV | 02</h3>
          <a class="text-decoration-none text-black">
            <CharacterCard :card_info="userData.favorite_two" no_hover="true" />
          </a>
        </div>
        <div class="col-md-3 mb-5">
          <h3 class="ff-chonburi fw-bold">FAV | 03</h3>
          <a class="text-decoration-none text-black">
            <CharacterCard :card_info="userData.favorite_three" no_hover="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import UserService from '../services/usersService'
import CharacterCard from '../components/CharacterCard.vue'
export default {
  components: { CharacterCard },
  async created () {
    utils.userAuthenticator(this.$router, 'home')
    const result = (await UserService.funcGetUserData(this.$route.params.userId)).data
    this.userData = result.user
  },
  data () {
    return {
      userData: null
    }
  }
}
</script>

<style scoped>
</style>

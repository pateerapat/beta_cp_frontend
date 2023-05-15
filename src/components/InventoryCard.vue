<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
      <div class="row mt-5 mx-1 gx-5">
        <h1 class="ff-chonburi fs-logo">YOUR CARDS</h1>
        <p>Storage for your cards collection.</p>
      </div>

      <div class="row mt-5 mx-1 gx-5">
        <div v-for="character_card in character_cards" v-bind:key="character_card.id" class="col-md-3 mb-5">
          <a class="text-decoration-none text-black">
            <CharacterCard :card_info="character_card" />
          </a>
        </div>
        <div v-if="!character_cards.length" class="card mb-5 py-4">
          No cards in your inventory. Get one bro.
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
  data () {
    return {
      character_cards: []
    }
  },
  async created () {
    utils.userAuthenticator(this.$router, 'home')
    const userId = localStorage.getItem('user_id')
    const result = (await UserService.funcGetUserCharacterCard(userId)).data
    this.character_cards = result.character_cards
    console.log(result)
  }
}
</script>

<style scoped>
</style>

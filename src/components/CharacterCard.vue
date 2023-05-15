<template>
  <!-- CHARACTER CARD RESOLUTION 200 x 380 -->
  <div class="popover__wrapper bg-sencondary" :style="cssProps">
    <div class="zoom">
      <div class="ff-chonburi rounded border-card character-image" :style="[{color: borderColor}, image_url]">
        <div style="height: 375px;">
          <div style="margin-left: -39px; padding-top: 20px; height: 280px;">
            <h1 v-for="index in rating" :key="index" class="text-white" style="line-height: 30px;">
              <i class="fa-solid fa-diamond fa-xs"></i>
            </h1>
            <h1 v-if="rating == 0" class="text-white" style="line-height: 30px;">
              <i class="fa-solid fa-bahai fa-xs" style="margin-left: -2px"></i>
            </h1>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p class="ff-montserrat fw-bold ps-2 pe-5 bg-dark text-white ps-2 pe-2 pt-2 border-top text-uppercase" style="font-size: 10px;">
                {{name}}
              </p>
              <p class="ff-montserrat fw-bold ps-2 pe-5 bg-dark text-white ps-2 pe-2 pb-3 text-uppercase" style="font-size: 8px; margin-top: -20px;">
                ({{type}})
              </p>
              <p class="ff-montserrat fw-bold ps-2 pe-5 bg-dark text-white ps-2 pe-2 pb-1 border-top border-bottom pt-1 text-uppercase" style="font-size: 8px; margin-top: -25px;">
                {{serie}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!no_hover" class="popover__content">
      <div class="row">
        <div class="col-md-8">
          <h4 class="text-white ff-chonburi">
            {{rating}} <i class="fa-solid fa-diamond fa-xs"></i> | {{name}}<br />
            ({{type}})
          </h4>
        </div>
        <div class="col-md-4">
          <button v-if="!user_info" @click="sellCard(id)" ref="sellBtn" class="btn btn-warning w-100 fs-5 fw-bold">
            Sell ( {{sellAmount}}<i class="fa-solid fa-gem fa-xs ps-2"></i> )
          </button>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <p class="text-white fs-6">
                Series :
              </p>
            </div>
            <div class="col-md-8">
              <p class="text-white fs-6">
                {{serie}}
              </p>
            </div>
          </div>
          <div v-if="user_info" class="row border-top pt-3">
            <div class="col-md-4">
              <p class="text-white fs-6">
                Claimed by :
              </p>
            </div>
            <div class="col-md-8">
              <p class="text-white fs-6">
                <span v-if="!user_info || !user_info.length">CARD HAS NOT BEEN CLAIMED</span>
                <span v-for="user in user_info" v-bind:key="user">
                  {{user.name}} ({{user.count}})<br />
                </span>
              </p>
            </div>
          </div>
          <div v-if="!user_info" class="row border-top pt-3">
            <div class="col-md-3">
              <button v-if="!user_info" @click="setFavoriteCardOne(id)" ref="setFavoriteBtn1" class="btn btn-warning w-100 fs-5 fw-bold">
                SET 1
              </button>
            </div>
            <div class="col-md-3">
              <button v-if="!user_info" @click="setFavoriteCardTwo(id)" ref="setFavoriteBtn2" class="btn btn-warning w-100 fs-5 fw-bold">
                SET 2
              </button>
            </div>
            <div class="col-md-3">
              <button v-if="!user_info" @click="setFavoriteCardThree(id)" ref="setFavoriteBtn3" class="btn btn-warning w-100 fs-5 fw-bold">
                SET 3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import utils from '../services/utils'
import coinEffect from '../assets/coin.mp3'
import UserService from '../services/usersService'
export default {
  props: [
    'card_info',
    'no_hover'
  ],
  data () {
    return {
      id: null,
      card_id: null,
      name: null,
      rating_title: null,
      serie: null,
      image_url: null,
      type: null,
      user_info: null,
      backend_path: null
    }
  },
  created () {
    this.id = this.card_info.id
    this.card_id = this.card_info.card_id
    this.name = this.card_info.name
    this.rating_title = this.card_info.rating
    this.serie = this.card_info.serie
    this.type = this.card_info.type
    this.backend_path = utils.getBackendPath()
    this.image_url = { backgroundImage: `url(${this.backend_path}/media${this.card_info.image_url})` }
    if (this.card_info.user_info) {
      this.user_info = this.card_info.user_info
    }
  },
  computed: {
    borderColor () {
      if (this.rating_title === 'common') {
        return '#828385'
      } else if (this.rating_title === 'uncommon') {
        return '#00A386'
      } else if (this.rating_title === 'rare') {
        return '#2471A3'
      } else if (this.rating_title === 'epic') {
        return '#7D3C98'
      } else if (this.rating_title === 'legendary') {
        return '#F1C40F'
      } else if (this.rating_title === 'heirloom') {
        return '#FF392E'
      } else if (this.rating_title === 'event') {
        return '#DC2367'
      } else {
        return '#828385'
      }
    },
    rating () {
      if (this.rating_title === 'common') {
        return 1
      } else if (this.rating_title === 'uncommon') {
        return 2
      } else if (this.rating_title === 'rare') {
        return 3
      } else if (this.rating_title === 'epic') {
        return 4
      } else if (this.rating_title === 'legendary') {
        return 5
      } else if (this.rating_title === 'heirloom') {
        return 6
      } else if (this.rating_title === 'event') {
        return 0
      } else {
        return 1
      }
    },
    sellAmount () {
      if (this.rating_title === 'common') {
        return 1
      } else if (this.rating_title === 'uncommon') {
        return 5
      } else if (this.rating_title === 'rare') {
        return 20
      } else if (this.rating_title === 'epic') {
        return 100
      } else if (this.rating_title === 'legendary') {
        return 250
      } else if (this.rating_title === 'heirloom') {
        return 1000
      } else if (this.rating_title === 'event') {
        return 100
      } else {
        return 1
      }
    },
    cssProps () {
      if (this.rating_title === 'common') {
        return {
          '--border-color': '#828385'
        }
      } else if (this.rating_title === 'uncommon') {
        return {
          '--border-color': '#27AE60'
        }
      } else if (this.rating_title === 'rare') {
        return {
          '--border-color': '#2471A3'
        }
      } else if (this.rating_title === 'epic') {
        return {
          '--border-color': '#7D3C98'
        }
      } else if (this.rating_title === 'legendary') {
        return {
          '--border-color': '#F1C40F'
        }
      } else if (this.rating_title === 'heirloom') {
        return {
          '--border-color': '#FF392E'
        }
      } else if (this.rating_title === 'event') {
        return {
          '--border-color': '#DC2367'
        }
      } else {
        return {
          '--border-color': '#828385'
        }
      }
    }
  },
  methods: {
    async sellCard (id) {
      this.$refs.sellBtn.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.sellBtn.disabled = true
      const audio = new Audio(coinEffect)
      audio.play()
      await this.delay(1000)
      const result = (await UserService.funcSellCard(id)).data
      if (result.success) {
        location.reload()
      }
    },
    async setFavoriteCardOne (id) {
      this.$refs.setFavoriteBtn1.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.setFavoriteBtn1.disabled = true

      const result = (await UserService.funcSetFavoriteCard0ne(id)).data

      if (result.success) {
        this.$refs.setFavoriteBtn1.innerHTML = 'SET 1'
        this.$refs.setFavoriteBtn1.disabled = false
      }
    },
    async setFavoriteCardTwo (id) {
      this.$refs.setFavoriteBtn2.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.setFavoriteBtn2.disabled = true

      const result = (await UserService.funcSetFavoriteCardTwo(id)).data

      if (result.success) {
        this.$refs.setFavoriteBtn2.innerHTML = 'SET 2'
        this.$refs.setFavoriteBtn2.disabled = false
      }
    },
    async setFavoriteCardThree (id) {
      this.$refs.setFavoriteBtn3.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.setFavoriteBtn3.disabled = true

      const result = (await UserService.funcSetFavoriteCardThree(id)).data

      if (result.success) {
        this.$refs.setFavoriteBtn3.innerHTML = 'SET 3'
        this.$refs.setFavoriteBtn3.disabled = false
      }
    },
    delay (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    }
  }
}
</script>

<style>
  .border-card {
    border-left: 50px solid;
  }
  .popover__wrapper {
    position: relative;
    margin-top: 1.5rem;
  }
  .popover__content {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 300px;
    left: -150px;
    transform: translate(0, 10px);
    background-color: #212529;
    padding: 1.5rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: 550px;
    border-radius: 20px;
  }
  .popover__content:before {
    position: absolute;
    z-index: -1;
    content: "";
    right: calc(50% - 10px);
    top: -8px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #212529 transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }
  .popover__wrapper:hover .popover__content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -20px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
  }

  .zoom {
    animation: zoom-out 0.2s ease;
    transition: box-shadow .2s;
    transition: opacity .2s;
    box-shadow: 0 0 50px white;
  }

  .zoom:hover {
    opacity: 20%;
    animation: zoom-in 0.2s ease;
    transition: opacity .2s;
    transform: scale(1.1);
    box-shadow: 0 0 50px var(--border-color);
  }

  @keyframes zoom-in {
    0% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1.1, 1.1);
    }
  }
  @keyframes zoom-out {
    0% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>

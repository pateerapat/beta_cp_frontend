<template>
  <!-- CARD PACK RESOLUTION 500 x 700 -->
  <div>
    <div v-if="fetched_card">
      <CardOpenerModal :fetched_card="fetched_card" :to_remove="to_remove" :current_packs="current_packs" />
    </div>
    <div class="popover__wrapper">
      <div class="zoom">
        <div id="d-wrapper" style="background-size: 250px;" :style="[image_url]">
          <div class="zig-zag-bottom zig-zag-top ff-chonburi">
            <div style="height: 220px;">
              <p v-if="is_new" class="ff-montserrat fs-4 badge rounded-pill bg-warning text-dark" style="margin-left: -60px;">NEW!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="popover__content">
        <div class="row">
          <div class="col-md-6">
            <h4 class="text-white ff-chonburi">
              {{name}}<br />
              ({{ratingFrom}} <i class="fa-solid fa-diamond fa-xs"></i> | {{ratingTo}} <i class="fa-solid fa-diamond fa-xs"></i>)
            </h4>
          </div>
          <div class="col-md-6">
            <button v-if="!isInventory" @click="purchasePack(pack_id)" ref="purchaseBtn" class="btn btn-warning w-100 fs-5 fw-bold">
              Purchase ( {{price}}<i class="fa-solid fa-gem fa-xs ps-2"></i> )
            </button>
            <button v-if="isInventory" @click="openPack(pack_id, id)" ref="openPackBtn" class="btn btn-warning w-100 fs-5 fw-bold">
              Unseal
            </button>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">
                <p class="text-white fs-6">
                  Included Series :
                </p>
              </div>
              <div class="col-md-8">
                <p v-if="series.length <= 5" class="text-white fs-6">
                  <span v-for="serie in series" v-bind:key="serie">
                    {{serie}}<br />
                  </span>
                </p>
                <p v-if="series.length > 5" class="text-white fs-6">
                  {{series.length}}+ Series
                </p>
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
import coinEffect from '../assets/coin.mp3'
import UserService from '../services/usersService'
import CardOpenerModal from '../components/CardOpenerModal.vue'
export default {
  components: {
    CardOpenerModal
  },
  props: [
    'pack_info',
    'is_inventory',
    'current_packs'
  ],
  data () {
    return {
      current_timeout: null,
      fail_current_timeout: null,
      id: null,
      pack_id: null,
      rating_from: null,
      rating_to: null,
      name: null,
      series: null,
      price: null,
      image_url: null,
      is_new: null,
      fetched_card: null,
      to_remove: null,
      backend_path: null
    }
  },
  created () {
    this.id = this.pack_info.id
    this.pack_id = this.pack_info.pack_id
    this.rating_from = this.pack_info.rating_from
    this.rating_to = this.pack_info.rating_to
    this.name = this.pack_info.name
    this.series = this.pack_info.series
    this.price = this.pack_info.price
    this.backend_path = utils.getBackendPath()
    this.image_url = { backgroundImage: `url(${this.backend_path}/media${this.pack_info.image_url})` }
    this.is_new = this.pack_info.is_new
  },
  computed: {
    isInventory () {
      if (this.is_inventory === 'true') {
        return true
      } else {
        return false
      }
    },
    ratingFrom () {
      if (this.rating_from === 'common') {
        return 1
      } else if (this.rating_from === 'uncommon') {
        return 2
      } else if (this.rating_from === 'rare') {
        return 3
      } else if (this.rating_from === 'epic') {
        return 4
      } else if (this.rating_from === 'legendary') {
        return 5
      } else if (this.rating_from === 'heirloom') {
        return 6
      } else if (this.rating_from === 'event') {
        return 'Event'
      } else {
        return 1
      }
    },
    ratingTo () {
      if (this.rating_to === 'common') {
        return 1
      } else if (this.rating_to === 'uncommon') {
        return 2
      } else if (this.rating_to === 'rare') {
        return 3
      } else if (this.rating_to === 'epic') {
        return 4
      } else if (this.rating_to === 'legendary') {
        return 5
      } else if (this.rating_to === 'heirloom') {
        return 6
      } else if (this.rating_to === 'event') {
        return 'Event'
      } else {
        return 1
      }
    }
  },
  methods: {
    async purchasePack (id) {
      const toast = document.querySelector('.custom-toast')
      const closeIcon = document.querySelector('.close')
      const failToast = document.querySelector('.custom-fail-toast')
      const failCloseIcon = document.querySelector('.fail-close')

      if (toast.classList.contains('active')) {
        toast.classList.remove('active')
        window.clearTimeout(this.current_timeout)
        this.current_timeout = null
      }

      if (failToast.classList.contains('active')) {
        failToast.classList.remove('active')
        window.clearTimeout(this.fail_current_timeout)
        this.fail_current_timeout = null
      }

      this.$refs.purchaseBtn.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.purchaseBtn.disabled = true

      const userId = localStorage.getItem('user_id')
      const result = (await UserService.funcPurchasePack(userId, id)).data

      if (result.success) {
        document.querySelector('.purchase-toast-information').innerHTML = `${this.name} is now added to your inventory.`
        toast.classList.add('active')

        const audio = new Audio(coinEffect)
        audio.play()

        this.current_timeout = setTimeout(() => {
          toast.classList.remove('active')
          this.current_timeout = null
        }, 5000)

        closeIcon.addEventListener('click', () => {
          toast.classList.remove('active')
          this.current_timeout = null
        })
      } else {
        failToast.classList.add('active')

        this.fail_current_timeout = setTimeout(() => {
          failToast.classList.remove('active')
          this.fail_current_timeout = null
        }, 5000)

        failCloseIcon.addEventListener('click', () => {
          failToast.classList.remove('active')
          this.fail_current_timeout = null
        })
      }
      this.$refs.purchaseBtn.innerHTML = `Purchase ( ${this.price}<i class="fa-solid fa-gem fa-xs ps-2"></i> )`
      this.$refs.purchaseBtn.disabled = false
    },
    async openPack (packId, id) {
      this.$refs.openPackBtn.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.openPackBtn.disabled = true

      const userId = localStorage.getItem('user_id')
      const result = (await UserService.funcOpenPack(userId, packId, id)).data

      if (!result.success) {
        return
      }
      this.fetched_card = result.character_card
      for (let i = 0; i < this.current_packs.length; i++) {
        if (id === this.current_packs[i].id) {
          this.to_remove = i
          return
        }
      }
    },
    delay (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    }
  }
}
</script>

<style>
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

  #d-wrapper .zig-zag-top:before {
    background:
      linear-gradient(-45deg, #212529 16px, red 16px, blue 16px, transparent 0),
      linear-gradient(45deg, #212529 16px, transparent 0);
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 22px 32px;
    content: " ";
    display: block;
    height: 32px;
    width: 100%;
    position: relative;
    bottom: 64px;
    left:0;
  }

  #d-wrapper div > * {
    margin: 0 40px;
  }

  #d-wrapper .zig-zag-bottom {
    margin: 32px 0;
    margin-top: 0;
    background-size: 300px;
  }

  #d-wrapper .zig-zag-top {
    margin: 32px 0;
    margin-bottom: 0;
    background-size: 300px;
  }

  #d-wrapper .zig-zag-bottom,
  #d-wrapper .zig-zag-top {
    padding: 32px 0;
  }

  #d-wrapper .zig-zag-bottom:after {
    background:
      linear-gradient(-45deg, transparent 16px, #212529 0),
      linear-gradient(45deg, transparent 16px, #212529 0);
    background-repeat: repeat-x;
    background-position: left bottom;
    background-size: 22px 32px;
    content: "";
    display: block;
    width: 100%;
    height: 32px;
    position: relative;
    top: 64px;
    left: 0px;
  }

  #d-wrapper p {
    text-align: center;
  }

  #d-wrapper p:not(:last-child) {
    margin-bottom: 20px;
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
    box-shadow: 0 0 50px gray;
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

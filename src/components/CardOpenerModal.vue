<template>
  <div ref="popUpModal" id="popup-modal" class="popup">
    <button ref="fetchedCardBtn" class="view-modal d-none">View Modal</button>
    <header>
      <div class="progress-bar">
        <div class="progress-fill" :style="[{backgroundColor: cardColor}]"></div>
      </div>
      <div ref="closeModal" id="close-modal" class="close">
        <i class="fas fa-solid fa-xmark"></i>
      </div>
    </header>
    <div class="content">
      <div class="row mt-5 mx-1 justify-content-center">
        <div ref="cardOpacityChanger" class="col-md-3 mb-5" style="opacity: 0%;">
          <a class="text-decoration-none text-black">
            <CharacterCard :card_info="fetched_card" />
          </a>
        </div>
        <div class="col-md-1 mb-5 pt-4">
          <button ref="lightningBtn" @click="reOpacity()" class="btn btn-warning text-white h-100"><i class="fa-solid fa-bolt fa-xl"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'
import vineBoomEffect from '../assets/vineboom.mp3'
import paperTearEffect from '../assets/papertear.mp3'
export default {
  components: { CharacterCard },
  props: [
    'fetched_card',
    'to_remove',
    'current_packs'
  ],
  async mounted () {
    const popup = this.$refs.popUpModal
    const close = this.$refs.closeModal

    await this.delay(1000)
    const audio = new Audio(paperTearEffect)
    audio.play()
    await this.delay(500)

    popup.classList.toggle('show')

    this.$refs.fetchedCardBtn.addEventListener('click', () => {
      popup.classList.toggle('show')
    })
    close.addEventListener('click', () => {
      this.current_packs.splice(this.to_remove, 1)
      this.$refs.fetchedCardBtn.click()
    })
  },
  computed: {
    cardColor () {
      if (this.fetched_card.rating === 'common') {
        return '#828385'
      } else if (this.fetched_card.rating === 'uncommon') {
        return '#00A386'
      } else if (this.fetched_card.rating === 'rare') {
        return '#2471A3'
      } else if (this.fetched_card.rating === 'epic') {
        return '#7D3C98'
      } else if (this.fetched_card.rating === 'legendary') {
        return '#F1C40F'
      } else if (this.fetched_card.rating === 'heirloom') {
        return '#FF392E'
      } else if (this.fetched_card.rating === 'event') {
        return '#DC2367'
      } else {
        return '#828385'
      }
    }
  },
  methods: {
    delay (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    },
    reOpacity () {
      const audio = new Audio(vineBoomEffect)
      audio.play()
      this.$refs.cardOpacityChanger.classList.toggle('card-is-flipped')
      this.$refs.lightningBtn.disabled = true
    }
  }
}
</script>

<style scoped>
  .scene {
    display: inline-block;
    width: 200px;
    height: 260px;
  /*   border: 1px solid #CCC; */
    margin: 40px 0;
    perspective: 600px;
  }

  .custom-card {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: center right;
    transition: transform 1s;
  }

  .is-flipped {
    transform: translateX(-100%) rotateY(-180deg);
  }

  .card-is-flipped {
    transform: translateX(-100%) rotateY(-180deg);
    animation: opacity-change 0.5s forwards;
  }

  @keyframes opacity-change {
    0% {
      transform: translateX(-100%) rotateY(-180deg);
      opacity: 0%;
    }
    100% {
      transform: translateX(0%) rotateY(0deg);
      opacity: 100%;
    }
  };

  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    backface-visibility: hidden;
  }

  .card__face--front {
    background: crimson;
  }

  .card__face--back {
    background: slateblue;
    transform: rotateY(180deg);
  }
  .progress-bar {
    position: relative;
    height: 10px;
    width: 90%;
    background-color: lightgray;
    border-radius: 25px;
  }

  .progress-fill {
    position: absolute;
    height: 10px;
    width: 0%;
    animation: progress-forward 0.5s infinite;
    background-color: green;
    border-radius: 15px;
  }

  @keyframes progress-forward {
    0% {
      width: 0%;
    }
    25% {
      width: 10%;
    }
    50% {
      width: 40%;
    }
    75% {
      width: 85%;
    }
    100% {
      width: 100%;
    }
  } ;

  ::selection{
    color: #fff;
    background: #7d2ae8;
  }
  .view-modal, .popup{
    position: absolute;
    left: 50%;
    z-index: 9;
  }

  button{
    outline: none;
    cursor: pointer;
    font-weight: 500;
    border-radius: 4px;
    border: 2px solid transparent;
    transition: background 0.1s linear, border-color 0.1s linear, color 0.1s linear;
  }
  .view-modal{
    top: 50%;
    color: #7d2ae8;
    font-size: 18px;
    padding: 10px 25px;
    background: #fff;
    transform: translate(-50%, -50%);
  }
  .popup{
    position: fixed;
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    top: -150%;
    width: 60%;
    height: 600px;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
    transform: translate(-50%, -50%) scale(1.2);
    transition: top 0s 0.2s ease-in-out,
                opacity 0.2s 0s ease-in-out,
                transform 0.2s 0s ease-in-out;
  }
  .popup.show{
    top: 50%;
    opacity: 1;
    pointer-events: auto;
    transform:translate(-50%, -50%) scale(1);
    transition: top 0s 0s ease-in-out,
                opacity 0.2s 0s ease-in-out,
                transform 0.2s 0s ease-in-out;

  }
  .popup :is(header, .icons, .field){
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .popup header{
    padding-bottom: 15px;
    border-bottom: 1px solid #ebedf9;
  }
  header span{
    font-size: 21px;
    font-weight: 600;
  }
  header .close, .icons a{
    display: flex;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  }
  header .close{
    color: #878787;
    font-size: 17px;
    background: #f2f3fb;
    height: 33px;
    width: 33px;
    cursor: pointer;
  }
  header .close:hover{
    background: #ebedf9;
  }
  .popup .content{
    margin: 20px 0;
  }
  .popup .icons{
    margin: 15px 0 20px 0;
  }
  .content p{
    font-size: 16px;
  }
  .content .icons a{
    height: 50px;
    width: 50px;
    font-size: 20px;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .icons a i{
    transition: transform 0.3s ease-in-out;
  }
  .icons a:nth-child(1){
    color: #1877F2;
    border-color: #b7d4fb;
  }
  .icons a:nth-child(1):hover{
    background: #1877F2;
  }
  .icons a:nth-child(2){
    color: #46C1F6;
    border-color: #b6e7fc;
  }
  .icons a:nth-child(2):hover{
    background: #46C1F6;
  }
  .icons a:nth-child(3){
    color: #e1306c;
    border-color: #f5bccf;
  }
  .icons a:nth-child(3):hover{
    background: #e1306c;
  }
  .icons a:nth-child(4){
    color: #25D366;
    border-color: #bef4d2;
  }
  .icons a:nth-child(4):hover{
    background: #25D366;
  }
  .icons a:nth-child(5){
    color: #0088cc;
    border-color: #b3e6ff;
  }
  .icons a:nth-child(5):hover{
    background: #0088cc;
  }
  .icons a:hover{
    color: #fff;
    border-color: transparent;
  }
  .icons a:hover i{
    transform: scale(1.2);
  }
  .content .field{
    margin: 12px 0 -5px 0;
    height: 45px;
    border-radius: 4px;
    padding: 0 5px;
    border: 1px solid #e1e1e1;
  }
  .field.active{
    border-color: #7d2ae8;
  }
  .field i{
    width: 50px;
    font-size: 18px;
    text-align: center;
  }
  .field.active i{
    color: #7d2ae8;
  }
  .field input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 15px;
  }
  .field button{
    color: #fff;
    padding: 5px 18px;
    background: #7d2ae8;
  }
  .field button:hover{
    background: #8d39fa;
  }
</style>

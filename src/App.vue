<template>
  <div id="app">
    <div class="bg-secondary vh-100">
      <Navigator :token="token"></Navigator>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
export default {
  name: 'App',
  components: { Navigator },
  created () {
    let user = localStorage.getItem('tokenDetail')
    if (user) {
      const userInfo = JSON.parse(user)
      this.token = userInfo.token
    }
  },
  data () {
    return {
      token: null,
      username: '',
      password: '',
      username_error: '',
      password_error: '',
      login_error: ''
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Chonburi&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  #app {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  img {
    pointer-events: none;
  }
  .ff-chonburi {
    font-family: 'Chonburi', cursive;
  }
  .fs-logo {
    font-size: 100px;
  }
  .bg-main {
    background-color: whitesmoke;
  }
  .vh-10 {
    height: 10vh;
  }
  .vh-90 {
    height: 90vh;
  }
</style>

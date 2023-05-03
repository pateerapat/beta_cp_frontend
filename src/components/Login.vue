<template>
  <div class="container">
    <div class="container-fluid vh-90 bg-main px-5 py-4">
      <div class="row mt-5">
        <div class="col-md-12 px-5">
          <div class="card">
            <div class="row g-0">
              <div class="col-md-5 pt-5 pe-4">
                <br><br><br>
                <img src="../assets/kuronuma-register-page.jpg" class="img-fluid rounded-start">
              </div>
              <div class="col-md-7 mt-5">
                <div class="card-body pe-5">
                  <h5 class="card-title ff-chonburi fs-logo">Login</h5>
                  <div class="mt-4">
                    <label for="username" class="form-label fw-bold">Username</label>
                    <input v-model="username" type="text" class="form-control py-3 fs-4" id="username">
                    <p v-if="username_error == ''" class="text-danger fs-6 pt-1">
                      &nbsp;
                    </p>
                    <p v-if="username_error != ''" class="text-danger fs-6 pt-1">
                      {{username_error}}
                    </p>
                  </div>
                  <div>
                    <label for="password" class="form-label fw-bold">Password</label>
                    <input v-model="password" type="password" class="form-control py-3 fs-4" id="password">
                    <p v-if="password_error == ''" class="text-danger fs-6 pt-1">
                      &nbsp;
                    </p>
                    <p v-if="password_error != ''" class="text-danger fs-6 pt-1">
                      {{password_error}}
                    </p>
                  </div>
                  <div class="text-end mb-4">
                    <button ref="loginBtn" @click="login()" class="btn btn-secondary fw-bold fs-5 w-50 py-3">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button ref="loginModalRef" type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#login-modal">
        Modal Activator
      </button>
      <LoginModal />
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import LoginModal from './LoginModal.vue'
import UserService from '../services/usersService'
export default {
  components: { LoginModal },
  created () {
    utils.guestAuthenticator(this.$router)
  },
  data () {
    return {
      username: '',
      password: '',
      username_error: '',
      password_error: '',
      login_error: ''
    }
  },
  methods: {
    async login () {
      this.$refs.loginBtn.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.loginBtn.disabled = true

      if (this.username === '') {
        this.username_error = 'Username cannot be blank.'
      } else if (this.username.length < 8) {
        this.username_error = 'Username must be longer than or equal to 8 characters.'
      } else {
        this.username_error = ''
      }

      if (this.password === '') {
        this.password_error = 'Password cannot be blank.'
      } else if (this.password.length < 8) {
        this.password_error = 'Password must be longer than or equal to 8 characters.'
      } else {
        this.password_error = ''
      }

      if (this.username === '' || this.password === '') {
        this.$refs.loginBtn.innerHTML = 'Login'
        this.$refs.loginBtn.disabled = false
        return false
      } else if (this.username.length < 8 || this.password.length < 8) {
        this.$refs.loginBtn.innerHTML = 'Login'
        this.$refs.loginBtn.disabled = false
        return false
      }
      let loginData = {
        username: this.username,
        password: this.password
      }

      let result = (await UserService.funcLogin(loginData)).data
      if (result.errors) {
        this.$refs.loginModalRef.click()
        this.$refs.loginBtn.innerHTML = 'Login'
        this.$refs.loginBtn.disabled = false
        return false
      }

      localStorage.setItem('tokenDetail', JSON.stringify(result))
      this.$router.go('/home')
    }
  }
}
</script>

<style scoped>

</style>

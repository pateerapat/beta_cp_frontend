<template>
  <div class="container">
    <div class="container-fluid bg-main px-5 py-4">
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
                  <h5 class="card-title ff-chonburi fs-logo">Register</h5>
                  <div class="mt-4">
                    <label for="email" class="form-label fw-bold">E-mail</label>
                    <input v-model="email" type="email" class="form-control py-3 fs-4" id="email">
                    <p v-if="email_error == ''" class="text-danger fs-6 pt-1">
                      &nbsp;
                    </p>
                    <p v-if="email_error != ''" class="text-danger fs-6 pt-1">
                      {{email_error}}
                    </p>
                  </div>
                  <div>
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
                    <button ref="registerBtn" @click="register()" class="btn btn-secondary fw-bold fs-5 w-50 py-3" href="/login">
                      Create an account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button ref="registerModalRef" type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#register-modal">
        Modal Activator
      </button>
      <RegisterModal />
    </div>
  </div>
</template>

<script>
import utils from '../services/utils'
import RegisterModal from './RegisterModal.vue'
import UserService from '../services/usersService'
export default {
  components: { RegisterModal },
  created () {
    utils.guestAuthenticator(this.$router)
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      email_error: '',
      username_error: '',
      password_error: ''
    }
  },
  methods: {
    async register () {
      this.$refs.registerBtn.innerHTML = '<div class="spinner-border text-light"></div>'
      this.$refs.registerBtn.disabled = true
      if (this.email === '') {
        this.email_error = 'Email cannot be blank.'
      } else {
        this.email_error = ''
      }

      if (this.username === '') {
        this.username_error = 'Username cannot be blank.'
      } else {
        this.username_error = ''
      }

      if (this.password === '') {
        this.password_error = 'Password cannot be blank.'
      } else {
        this.password_error = ''
      }

      if (this.username === '' || this.password === '' || this.email === '') {
        this.$refs.registerBtn.innerHTML = 'Create an account'
        this.$refs.registerBtn.disabled = false
        return false
      }
      let registerData = {
        email: this.email,
        username: this.username,
        password: this.password
      }

      let result = (await UserService.funcRegister(registerData)).data
      if (result.errors) {
        result.errors.forEach(element => {
          if (element.field_name === 'email') {
            this.email_error = element.error_msg[0]
          } else if (element.field_name === 'username') {
            this.username_error = element.error_msg[0]
          } else if (element.field_name === 'password') {
            this.password_error = element.error_msg[0]
          }
        })
        this.$refs.registerBtn.innerHTML = 'Create an account'
        this.$refs.registerBtn.disabled = false
        return false
      }

      this.$refs.registerBtn.innerHTML = 'Create an account'
      this.$refs.registerBtn.disabled = false
      this.username = ''
      this.password = ''
      this.email = ''
      this.$refs.registerModalRef.click()
    }
  }
}
</script>

<style scoped>

</style>

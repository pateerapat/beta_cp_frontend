import api from './api'

export default {
  funcRegister (user) {
    return api().post('api/register/', user)
  },
  funcLogin (user) {
    return api().post('api/login/', user)
  },
  funcGetUser (token) {
    return api().post('api/user/', {token})
  }
}

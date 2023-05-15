export default {
  getBackendPath () {
    return 'https://betacpbackend-production.up.railway.app'
  },
  guestAuthenticator (router) {
    let user = localStorage.getItem('tokenDetail')
    if (user) {
      router.push('/home')
    }
  },
  userAuthenticator (router, currentPath) {
    let user = localStorage.getItem('tokenDetail')
    if (user && currentPath !== 'home') {
      router.push('/home')
    }
  }
}

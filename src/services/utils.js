export default {
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
    } else {
      router.push('/')
    }
  }
}

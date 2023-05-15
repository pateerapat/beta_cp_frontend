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
  },
  funcGetUserCharacterCard (user) {
    return api().post('api/user_character_cards/', {user})
  },
  funcGetShop () {
    return api().post('api/shop_card_packs/')
  },
  funcGetUserCardPack (user) {
    return api().post('api/user_card_packs/', {user})
  },
  funcPurchasePack (user, packId) {
    return api().post('api/purchase_pack/', {
      user,
      packId
    })
  },
  funcOpenPack (user, packId, userPackId) {
    return api().post('api/open_pack/', {
      user,
      packId,
      userPackId
    })
  },
  funcGetAllCharacterCards () {
    return api().post('api/get_all_character_cards/')
  },
  funcSellCard (userCardId) {
    return api().post('api/sell_user_card/', { userCardId })
  },
  funcGetAllNotification () {
    return api().post('api/get_all_notification/')
  },
  funcSetFavoriteCard0ne (userCardId) {
    return api().post('api/set_favorite_card/', {
      userCardId,
      position: 1
    })
  },
  funcSetFavoriteCardTwo (userCardId) {
    return api().post('api/set_favorite_card/', {
      userCardId,
      position: 2
    })
  },
  funcSetFavoriteCardThree (userCardId) {
    return api().post('api/set_favorite_card/', {
      userCardId,
      position: 3
    })
  },
  funcGetUserData (userId) {
    return api().post('api/get_user_by_id/', { userId })
  },
  funcGetAllUsers () {
    return api().post('api/get_all_users/')
  }
}

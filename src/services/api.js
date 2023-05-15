import axios from 'axios'
import utils from '../services/utils'

export default () => {
  return axios.create({
    baseURL: utils.getBackendPath()
  })
}

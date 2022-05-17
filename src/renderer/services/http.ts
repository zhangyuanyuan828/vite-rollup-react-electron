import axios from 'axios'
import qs from 'qs'

export const http = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false })
  }
})

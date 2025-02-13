import axios from 'axios'

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

let djangoURL = process.env.API_ORIGIN_URL

let defaultTimeout = 30000 // 30.000 [s]
if (process.env.PROD) {
  djangoURL = process.env.API_ORIGIN_URL
  defaultTimeout = 10000
}
axios.defaults.baseURL = djangoURL
axios.defaults.timeout = defaultTimeout

const api = axios.create()
export { api }
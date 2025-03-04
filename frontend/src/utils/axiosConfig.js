import axios from 'axios'

let axiosIntance = axios.create()

axiosIntance.defaults.timeout = 1000 * 60 * 10
axiosIntance.defaults.withCredentials = true

axiosIntance.interceptors.request.use(
  (config) => { return config },
  (error) => { return Promise.reject(error) }
)

axiosIntance.interceptors.response.use(
  (response) => { return response },
  (error) => { return Promise.reject(error) }
)

export default axiosIntance
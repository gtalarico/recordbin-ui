import axios from "axios"
import store from "@/store"

let $axios = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (typeof error.response === "undefined") {
      throw error
    } else if (error.response.status == 401) {
      console.warn("Invalid Credentials")
      store.commit("api/clearUserToken")
    }
    return Promise.reject(error)
  }
)

$axios.interceptors.request.use(config => {
  const userToken = store.state.api.userToken
  const serverUrl = store.state.api.serverUrl
  if (userToken) config.headers.Authorization = `UserToken ${userToken}`
  if (serverUrl) config.baseURL = serverUrl
  return config
})

let $backend = {}

$backend.fetch = resourceName => {
  const url = `/api/v1/${resourceName}/`
  return $axios.get(url).then(response => response.data)
}

$backend.post = (resourceName, payload) => {
  const url = `/api/v1/${resourceName}/`
  return $axios.post(url, payload).then(response => response.data)
}

$backend.login = form => {
  return $axios
    .post("/api/v1/auth/token/login/", form, { withCredentials: true })
    .then(response => {
      const userToken = response.data["auth_token"]
      return userToken
    })
}

$backend.register = form => {
  return $axios.post("/api/v1/auth/users/", form).then(response => {
    const user = response.data
    return user
  })
}

$backend.logout = () => {
  return $axios.post(`/api/v1/auth/token/logout/`)
}

$backend.getUser = () => {
  return $axios.get("/api/v1/auth/users/me/").then(response => {
    return response.data
  })
}

export default $backend

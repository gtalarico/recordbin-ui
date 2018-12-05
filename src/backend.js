import axios from "axios"
import auth from "@/auth"

let $axios = axios.create({
  baseURL: "/api/v1/",
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
    if (error.response.status == 401) {
      auth.clearToken()
    }
    console.warn(error)
    return Promise.reject(error)
  }
)

$axios.interceptors.request.use(config => {
  const token = auth.readToken()
  if (token) config.headers["Authorization"] = `UserToken ${token}`
  return config
})

let $backend = {}

$backend.fetch = resourceName => {
  const url = `${resourceName}/`
  return $axios.get(url).then(response => response.data)
}

$backend.post = (resourceName, payload) => {
  const url = `${resourceName}/`
  return $axios.post(url, payload).then(response => response.data)
}

$backend.login = form => {
  return $axios.post("auth/token/login/", form).then(response => {
    const userToken = response.data["auth_token"]
    auth.saveToken(userToken)
    $axios.defaults.headers = { Authorization: `UserToken ${userToken}` }
  })
}

$backend.logout = () => {
  auth.clearToken()
  const url = `auth/tokens/logout/`
  return $axios.post(url).then()
}

$backend.getUser = () => {
  return $axios.get("auth/users/me/").then(response => {
    return response.data
  })
}

export default $backend
